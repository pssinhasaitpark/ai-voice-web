// const BASE_URL = "http://192.168.0.201:3000/api";
// const BASE_URL = "https://ai-voice-open-api.vercel.app/api";
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
