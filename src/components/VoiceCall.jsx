export default function VoiceCall({ onBack }) {
  return (
    <div className="voice-box">
      <div className="chat-header">
        <button onClick={onBack}>←</button>
        <span>Voice Call</span>
      </div>

      <div className="voice-body">
        🎤 Voice calling feature coming soon
      </div>
    </div>
  );
}

