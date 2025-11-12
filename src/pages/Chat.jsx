import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const messageEndRef = useRef(null); // To auto-scroll

  // Get info from the URL
  const topic = searchParams.get("topic") || "your swap";
  const chatWithUser = searchParams.get("user") || "the owner";

  // State for messages and the input box
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: chatWithUser,
      text: `Hey! I see you're interested in my ${topic} subscription.`,
    },
    // You can add more mock history here if you want
  ]);

  // Function to send a new message
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: user.username, // 'you'
      text: input.trim(),
    };

    setMessages([...messages, newMessage]);
    setInput(""); // Clear the input box
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) {
    return (
      <div className="chat-page-container">
        <p style={{ textAlign: "center", color: "var(--dark-text-secondary)" }}>
          Please <Link to="/login">log in</Link> to view your chats.
        </p>
      </div>
    );
  }

  return (
    <div className="chat-page-container">
      <div className="chat-header">
        <Link to="/" className="chat-back-button">
          &larr; Back
        </Link>
        <div className="chat-header-info">
          <h2>{chatWithUser}</h2>
          <p>Discussing: {topic}</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${
              msg.sender === user.username ? "self" : "other"
            }`}
          >
            <strong>{msg.sender === user.username ? "You" : msg.sender}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        {/* This empty div is the target for auto-scrolling */}
        <div ref={messageEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;