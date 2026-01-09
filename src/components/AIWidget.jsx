import { useState } from "react";
import ChatBox from "./ChatBox";
import VoiceCall from "./VoiceCall";
import "../styles/aiWidget.css";

export default function AIWidget({ onExtractUpdate }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(null);

  const closeAll = () => {
    setOpen(false);
    setMode(null);
  };

  return (
    <>
      {/* FLOATING ASK AI / CLOSE BUTTON */}
      <button
        className={`ai-fab ${open ? "open" : ""}`}
        onClick={() => (open ? closeAll() : setOpen(true))}
      >
        {open ? "✕" : "Ask AI Agent"}
      </button>

      {open && (
        <div className="ai-overlay" >
          <div
            className="ai-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* -------- WELCOME -------- */}
            {!mode && (
              <>
                <div className="ai-header">
                  <h3>Welcome 👋</h3>
                  <p>How can we help you today?</p>
                </div>

                <div className="ai-actions">
                  <button
                    className="ai-btn primary"
                    onClick={() => setMode("chat")}
                  >
                    💬 Chat with AI
                  </button>

                  <button
                    className="ai-btn"
                    onClick={() => setMode("voice")}
                  >
                    📞 Voice Call
                  </button>
                </div>
              </>
            )}

            {/* -------- CHAT -------- */}
            {mode === "chat" && (
              <ChatBox
                onBack={() => setMode(null)}
                onExtractUpdate={onExtractUpdate}
              />
            )}

            {/* -------- VOICE -------- */}
            {mode === "voice" && (
              <VoiceCall onBack={() => setMode(null)} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
