export async function analyzeText(text) {
  const res = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return await res.json();
}
