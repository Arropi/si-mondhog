package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/kardianos/service"
	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/disk"
	"github.com/shirou/gopsutil/v3/host"
	"github.com/shirou/gopsutil/v3/mem"
)

const backendURL = "http://localhost:3000/api/agent"

type Config struct {
	MachineID string `json:"machine_id"`
	APIKey    string `json:"api_key"`
	Interval  int    `json:"interval"`
}

type BootstrapResponse struct {
	MachineID string `json:"machine_id"`
	APIKey    string `json:"api_key"`
	Interval  int    `json:"interval"`
}

var httpClient = &http.Client{
	Timeout: 10 * time.Second,
}

type program struct{}

func (p *program) Start(s service.Service) error {
	go runAgentLoop()
	return nil
}

func (p *program) Stop(s service.Service) error {
	return nil
}

func main() {

	activation := flag.String("activation", "", "activation token")
	flag.Parse()

	svcConfig := &service.Config{
		Name:        "MonitoringAgent",
		DisplayName: "Monitoring Agent",
		Description: "Hardware monitoring agent",
	}

	prg := &program{}
	s, _ := service.New(prg, svcConfig)

	if *activation != "" {

		err := activate(*activation)
		if err != nil {
			fmt.Println("Activation failed:", err)
			return
		}

		fmt.Println("Activation success")

		s.Install()
		s.Start()

		fmt.Println("Service installed and started")

		return
	}

	err := s.Run()
	if err != nil {
		fmt.Println(err)
	}
}

func getConfigPath() string {

	dir, _ := os.UserConfigDir()

	agentDir := filepath.Join(dir, "monitoring-agent")

	os.MkdirAll(agentDir, 0755)

	return filepath.Join(agentDir, "config.json")
}

func activate(token string) error {

	specs := getMachineSpecs()

	payload := map[string]interface{}{
		"activation_token": token,
		"specs":            specs,
	}

	data, _ := json.Marshal(payload)

	resp, err := httpClient.Post(
		backendURL+"/bootstrap",
		"application/json",
		bytes.NewBuffer(data),
	)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != 200 {
		return fmt.Errorf(string(body))
	}

	var result BootstrapResponse

	err = json.Unmarshal(body, &result)
	if err != nil {
		return err
	}

	cfg := Config{
		MachineID: result.MachineID,
		APIKey:    result.APIKey,
		Interval:  result.Interval,
	}

	configPath := getConfigPath()

	configData, _ := json.MarshalIndent(cfg, "", " ")

	return os.WriteFile(configPath, configData, 0644)
}

func loadConfig() (*Config, error) {

	configPath := getConfigPath()

	data, err := os.ReadFile(configPath)
	if err != nil {
		return nil, err
	}

	var cfg Config

	err = json.Unmarshal(data, &cfg)

	return &cfg, err
}

func runAgentLoop() {

	cfg, err := loadConfig()
	if err != nil {
		fmt.Println("Config not found")
		return
	}

	interval := time.Duration(cfg.Interval) * time.Second

	for {

		sendHeartbeat(cfg)

		sendMetrics(cfg)

		time.Sleep(interval)
	}
}

func getMachineSpecs() map[string]interface{} {

	hostInfo, _ := host.Info()

	memStat, _ := mem.VirtualMemory()

	diskStat := getDiskUsage()

	cpuCores, _ := cpu.Counts(true)

	return map[string]interface{}{
		"hostname":      hostInfo.Hostname,
		"os":            hostInfo.Platform,
		"cpu_cores":     cpuCores,
		"total_ram_gb":  float64(memStat.Total) / (1024 * 1024 * 1024),
		"total_disk_gb": float64(diskStat.Total) / (1024 * 1024 * 1024),
	}
}

func getDiskUsage() *disk.UsageStat {

	if os.PathSeparator == '\\' {
		d, _ := disk.Usage("C:\\")
		return d
	}

	d, _ := disk.Usage("/")
	return d
}

func sendHeartbeat(cfg *Config) {

	payload := map[string]string{
		"status": "alive",
	}

	sendPost("/heartbeat", cfg.APIKey, payload)
}

func sendMetrics(cfg *Config) {

	cpuPercent, _ := cpu.Percent(0, false)

	cpuUsage := 0.0

	if len(cpuPercent) > 0 {
		cpuUsage = cpuPercent[0]
	}

	memStat, _ := mem.VirtualMemory()

	diskStat := getDiskUsage()

	payload := map[string]interface{}{
		"cpu_percent":  cpuUsage,
		"ram_percent":  memStat.UsedPercent,
		"disk_percent": diskStat.UsedPercent,
		"ram_used_gb":  float64(memStat.Used) / (1024 * 1024 * 1024),
		"disk_used_gb": float64(diskStat.Used) / (1024 * 1024 * 1024),
	}

	sendPost("/metrics", cfg.APIKey, payload)
}

func sendPost(endpoint string, apiKey string, payload interface{}) {

	data, _ := json.Marshal(payload)

	req, err := http.NewRequest(
		"POST",
		backendURL+endpoint,
		bytes.NewBuffer(data),
	)

	if err != nil {
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := httpClient.Do(req)

	if err != nil {
		return
	}

	defer resp.Body.Close()
}