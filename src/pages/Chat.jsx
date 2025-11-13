import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const messageEndRef = useRef(null);
  
  // Get info from the URL
  const topic = searchParams.get("topic") || "your swap";
  const chatWithEmail = searchParams.get("user") || null;

  // --- Create friendly name from email ---
  const getFriendlyName = (email) => {
    if (!email) return "Unknown";
    let name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const chatWithUser = getFriendlyName(chatWithEmail);
  const myFriendlyName = user ? getFriendlyName(user.username) : "You";

  // --- FAKE CHAT ---
  // We use simple useState here. This is NOT persistent,
  // but it will work for the demo.
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: chatWithUser,
      text: `Hey! I see you're interested in my ${topic} subscription.`,
    },
  ]);

  // Function to send a new message
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: myFriendlyName, // Use friendly name
      text: input.trim(),
    };

    setMessages([...messages, newMessage]);
    setInput(""); // Clear the input box
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle a user landing on /chat without a query
  if (!chatWithEmail) {
     return (
       <div className="chat-page-container">
         <div className="chat-messages" style={{ justifyContent: 'center', alignItems: 'center'}}>
           <p style={{ color: "var(--dark-text-secondary)", fontSize: "1.1rem" }}>
             Select a chat from your Swap Requests to begin.
           </p>
         </div>
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
        {messages.map((msg) => {
          const isSelf = msg.sender === myFriendlyName;
          return (
            <div
              key={msg.id}
              className={`message-bubble ${isSelf ? "self" : "other"}`}
            >
              <strong>{msg.sender}</strong>
              <p>{msg.text}</p>
            </div>
          );
        })}
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