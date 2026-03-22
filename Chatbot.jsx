import React, { useState } from "react";
import "./Chatbot.css";

const faqResponses = {
  "Price": "Our products range from $10 to $500 depending on the item.",
  "Delivery": "We offer free delivery on orders above $50. Standard delivery takes 3-5 business days.",
  "Return": "You can return any product within 30 days of purchase with a valid receipt.",
  "Payment Mode": "We accept Credit/Debit cards, UPI, PayPal, and Net Banking.",
  "Offers": "We run seasonal offers and discounts. Check our 'Offers' section for details.",
  "Other": "Please type your query below and press send."
};

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState("");

  if (!isOpen) return null;

  const handleUserClick = (question) => {
    setMessages(prev => [...prev, { sender: "user", text: question }]);

    if (question === "Other") {
      setShowCustomInput(true);
      setMessages(prev => [...prev, { sender: "bot", text: faqResponses["Other"] }]);
      return;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: faqResponses[question] }]);
    }, 500);
  };

  const handleCustomSend = () => {
    if (!customInput.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: customInput }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: "Thank you for your query. We will get back to you soon." }]);
    }, 500);

    setCustomInput("");
    setShowCustomInput(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <span>Chatbot</span>
        <button onClick={onClose} className="chatbot-close-btn">✕</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.sender === "bot" ? "bot" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* FAQ Buttons */}
      {!showCustomInput && (
        <div className="chatbot-faq-buttons">
          {Object.keys(faqResponses).map((q, index) => (
            <button key={index} onClick={() => handleUserClick(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Custom Input for "Other" */}
      {showCustomInput && (
        <div className="chatbot-input">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type your query..."
            onKeyPress={(e) => e.key === "Enter" && handleCustomSend()}
          />
          <button onClick={handleCustomSend}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;