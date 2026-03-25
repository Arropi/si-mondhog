export async function downloadCsvClient(machineId: string, token: string) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3030/api";

  const response = await fetch(`${API_BASE_URL}/csv/download/${machineId}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!response.ok) throw new Error(`Download failed: ${response.status}`);

  return response.blob();
}