import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import TalkingDoctor from '../../assets/talkingDoctor.png';

const Main = () => {
  const navigate = useNavigate();
  const [daysSinceSignup, setDaysSinceSignup] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const createDate = localStorage.getItem('createdDate');
    const userNameFromStorage = localStorage.getItem('userName');

    if (createDate && userNameFromStorage) {
      setUserName(userNameFromStorage);

      const signupDate = new Date(createDate);
      const currentDate = new Date();
      const timeDiff = currentDate - signupDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))+1; // 일 수 계산
      setDaysSinceSignup(daysDiff);
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/FreeTalkingMain');
  };

  const handleDiaryClick = () => {
    navigate('/DiaryMain');
  };

  return (
    <div className="main-container">
      <h1>{userName}님</h1>
      
      <div className="day-check">
        <p>토닥이와 함께한지</p>
        <h2>{daysSinceSignup}일차</h2>
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
