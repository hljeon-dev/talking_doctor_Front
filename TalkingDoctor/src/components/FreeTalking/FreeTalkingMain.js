import React, { useState } from 'react';
import './FreeTalkingMain.css'; // 스타일 파일을 따로 구성
import FreeTalking from './FreeTalking'; // FreeTalking.js import

const cards = [
  {
    title: "자유로운 대화",
    description: "아무거나 말하기",
    likes: 75,
    icon: "💬",
  },
  {
    title: "오픽을 한 번 해볼까요?",
    description: "오픽 시험 시뮬레이션",
    likes: 54,
    icon: "💼",
  },
  {
    title: "주문하시겠어요?",
    description: "맥도날드에서 햄버거를 주문한다.",
    likes: 74,
    icon: "🍔",
  },
  {
    title: "Creative Naming Adventure",
    description: "AI가 영어이름을 만들어준다",
    likes: 40,
    icon: "✨",
  },
  {
    title: "하루 1분 프리톡",
    description: "오늘 있었던 일을 얘기한다.",
    likes: 289,
    icon: "🗣️",
  },
  {
    title: "책 읽고 발음 교정받기",
    description: "책을 소리내서 읽고 교정받기",
    likes: 147,
    icon: "📚",
  }
];

const FreeTalkingMain = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (selectedTopic) {
    return <FreeTalking topic={selectedTopic} />;
  }

  return (
    <div className="community-container">
      <div className="header">
        <h1 className="title">Free Talking</h1>
        <p className="subtitle">주제를 선택하여 자유롭게 대화해보세요!</p>
      </div>
      <div className="topics-container">
        {cards.map((card, index) => (
          <div key={index} className="topic-card" onClick={() => setSelectedTopic(card.title)}>
            <div className="icon">{card.icon}</div>
            <div className="content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="likes">♥ {card.likes}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeTalkingMain;
