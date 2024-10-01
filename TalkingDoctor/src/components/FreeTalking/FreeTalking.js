import React, { useState } from 'react';
import './FreeTalking.css'; // 스타일 파일을 따로 구성

const initialMessages = [
  { text: "Hey, I was just about to call you! What's up?", sender: "user" },
  { text: "Hi, how are you?", sender: "ai", correction: "완벽한 표현", advice: "친절하고 자연스럽게 말하셨어요." },
  { text: "I'm good. How's your work week?", sender: "user" },
  { text: "It's really hard week.", sender: "ai", correction: "개선 필요", advice: "자연스럽게 말하자면 'It's been a really hard week.'이라고 말해보세요." },
  { text: "I'm sorry to hear that. What do you want to do for dinner on Friday night?", sender: "user" },
];

const FreeTalking = ({ topic }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");

      // AI 응답 추가
      setTimeout(() => {
        const aiResponse = generateAIResponse(newMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          aiResponse
        ]);
      }, 1000); // 1초 뒤 AI가 응답하는 시뮬레이션
    }
  };

  const generateAIResponse = (userMessage) => {
    // 간단한 AI 응답 로직 (실제 응답 로직을 여기에 추가할 수 있음)
    const correctedResponse = {
      text: "It's been a really hard week.",
      sender: "ai",
      correction: "개선 필요",
      advice: "자연스럽게 말하자면 'It's been a really hard week.'이라고 말해보세요."
    };
    return correctedResponse;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{topic}</h2>
      </div>
      <div className="chat-content">
        {messages.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.sender}`}>
            <p>{message.text}</p>
            {message.correction && message.sender === "ai" && (
              <div className={`correction ${message.correction === "완벽한 표현" ? "perfect" : "improvement"}`}>
                <strong>{message.correction}</strong>
                <p>{message.advice}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default FreeTalking;
