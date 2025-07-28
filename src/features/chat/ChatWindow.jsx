import React, { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: 'You', text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        background: '#f9f9f9',
        maxWidth: '400px',
        margin: '2rem auto',
      }}
    >
      <h3>Mock Chat Window</h3>
      <div
        style={{
          height: '200px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '0.5rem',
          marginBottom: '1rem',
          backgroundColor: '#fff',
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: '#888' }}>No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Type your message"
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '70%', padding: '0.4rem' }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: '0.4rem 0.8rem',
          marginLeft: '0.5rem',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatWindow;
