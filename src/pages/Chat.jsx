import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { from: "alice", text: "Hey, want to swap Netflix for Spotify?" },
    { from: "you", text: "Sure, let’s do it!" },
  ]);
  const [input, setInput] = useState("");

  if (!user) return <p style={{ padding: "20px" }}>Login to access chat.</p>;

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "you", text: input }]);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", maxHeight: "300px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "8px" }}>
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        style={{ width: "80%", padding: "8px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} style={{ padding: "8px", marginLeft: "8px" }}>Send</button>
    </div>
  );
};

export default Chat;
