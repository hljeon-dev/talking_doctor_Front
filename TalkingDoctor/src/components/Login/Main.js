import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import TalkingDoctor from '../../assets/talkingDoctor.png';

const Main = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleDiaryClick = () => {
    navigate('/DiaryMain');
  };

  return (
    <div className="main-container">
      <h1>000님</h1>
      
      <div className="day-check">
        <p>토닥이와 함께한지</p>
        <h2>N일차</h2>
      </div>

      <div className="image-container">
        <img src={TalkingDoctor} alt="Talking Doctor" className="talking-doctor-image" />
      </div>
      
      <div className="options">
        <button className="option-button" onClick={handleProfileClick}>토닥이 프리토킹</button>
        <button className="option-button" onClick={handleDiaryClick}>토닥토닥 Daily Diary</button>
      </div>
    </div>
  );
};

export default Main;
