import { useEffect, useRef, useState } from "react";
import { startConversation, sendMessage } from "../api/aiApi";

export default function ChatBox({ onBack, onExtractUpdate }) {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // 🔹 Auto scroll ref
  const bottomRef = useRef(null);

  /* ---------- START CONVERSATION ---------- */
  useEffect(() => {
    startConversation().then((res) => {
      setConversationId(res.conversationId);
      setMessages([
        {
          from: "bot",
          text: res.text,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });
  }, []);

  /* ---------- AUTO SCROLL ON NEW MESSAGE ---------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- SEND MESSAGE ---------- */
  const handleSend = async () => {
    if (!input.trim() || sending) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      from: "user",
      text: input,
      status: "sending",
      time,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

try {
  const res = await sendMessage(conversationId, input);

  // ✅ mark last user message as sent (ONLY ONCE)
  setMessages((prev) =>
    prev.map((m, i) =>
      i === prev.length - 1 ? { ...m, status: "sent" } : m
    )
  );

  // ⚠️ AI ERROR MESSAGE (optional warning)
  if (res.meta?.aiError) {
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: "⚠️  429 Rate limit reached for gpt-4o-mini in organization org. Please try again.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }

  // 🤖 Bot reply (question / repeat / next)
  setMessages((prev) => [
    ...prev,
    {
      from: "bot",
      text: res.text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  // 📌 Update extracted data
  if (res.data) {
    onExtractUpdate((prev) => ({
      ...prev,
      ...res.data,
    }));
  }
} finally {
  setSending(false);
}
  };

  return (
    <div className="ai-dialog">
      {/* ---------- HEADER ---------- */}
      <div className="ai-header">
        PropertyFinder Assistant
        <small>Ask me about properties</small>
      </div>

      {/* ---------- CHAT BODY ---------- */}
      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg-row ${m.from}`}>
            {/* BOT AVATAR */}
            {m.from === "bot" && <div className="avatar">🤖</div>}

            <div>
              <div className={`msg ${m.from}`}>{m.text}</div>

              {m.from === "user" && m.status === "sending" && (
                <div className="status">Sending…</div>
              )}

              <div className="time">{m.time}</div>
            </div>

            {m.from === "user" && <div className="avatar">👤</div>}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* ---------- INPUT ---------- */}
      <div className="chat-input">
        <input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} disabled={sending}>
          ➤
        </button>
      </div>
    </div>
  );
}
