const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function startConversation() {
  const res = await fetch(`${BASE_URL}/conversation/start`);
  return res.json();
}

export async function sendMessage(conversationId, sentence) {
  const res = await fetch(`${BASE_URL}/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId, sentence })
  });
  return res.json();
}
