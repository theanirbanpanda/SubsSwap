import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { useListings } from "../features/listings/ListingsContext"; // Get chat functions

const Chat = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const messageEndRef = useRef(null);
  
  // Get chat functions from our context
  const { chatMessages, addChatMessage, isLoading } = useListings();

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

  // State for the input box
  const [input, setInput] = useState("");

  // --- Filter messages for this specific chat thread ---
  const currentThreadId = useMemo(() => {
    if (!user || !chatWithEmail) return null;
    return [user.username, chatWithEmail].sort().join('_');
  }, [user, chatWithEmail]);

  const messages = useMemo(() => {
    if (!currentThreadId) return [];
    return chatMessages.filter((msg) => msg.threadId === currentThreadId);
  }, [chatMessages, currentThreadId]);
  
  // --- Handle sending a message ---
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !currentThreadId) return;

    const newMessage = {
      id: Date.now(),
      threadId: currentThreadId,
      sender: user.username, // Use the full email as the sender ID
      text: input.trim(),
    };

    await addChatMessage(newMessage); // Send to context
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
             Select a swap request to start chatting.
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
        {isLoading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--dark-text-secondary)"}}>
            No messages yet. Say hello!
          </p>
        ) : (
          messages.map((msg) => {
            const isSelf = msg.sender === user.username;
            return (
              <div
                key={msg.id}
                className={`message-bubble ${isSelf ? "self" : "other"}`}
              >
                <strong>{isSelf ? "You" : getFriendlyName(msg.sender)}</strong>
                <p>{msg.text}</p>
              </div>
            );
          })
        )}
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