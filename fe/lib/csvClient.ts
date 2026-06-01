"use server";
export async function downloadCsvClient(machineId: string, token: string) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;
  const url = `${API_BASE_URL}/csv/download/${machineId}`;
  const response = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!response.ok) throw new Error(`Download failed: ${response.status}`);

  return response.text();
}
