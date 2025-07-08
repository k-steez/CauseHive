import React, { useState } from 'react';
import '../global.css';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-widget">
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </button>
      {open && (
        <div className="chat-box">
          <p>Hi there! 👋<br/>How can we help you support a cause today?</p>
          <p style={{fontSize: '0.9rem', color: '#aaa'}}>Try: "How do I donate?" or "Show me water projects"</p>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
