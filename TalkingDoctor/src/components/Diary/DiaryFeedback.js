import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import './DiaryFeedback.css';
import talkingDoctor from '../../assets/talkingDoctor.png';

const DiaryFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // DiaryWrite에서 전달된 selectedDate와 diaryEntry
  const selectedDate = location.state?.selectedDate || new Date();
  const diaryEntry = location.state?.diaryEntry || '작성한 일기가 없습니다.';
  const feedback = location.state?.feedback || '피드백이 없습니다.';

  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth() + 1);
  const [day, setDay] = useState(selectedDate.getDate());
  const [content, setContent] = useState('');

  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  }));

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString().padStart(2, '0'),
  }));

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: i + 1,
    label: (i + 1).toString().padStart(2, '0'),
  }));

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption.value);
  };

  const handleDayChange = (selectedOption) => {
    setDay(selectedOption.value);
  };

  const handleOkButtonClick = () => {
    navigate('/DiaryFeedback');
  }

  return (
    <div className="diary-feedback-container">
      <div className="diary-feedback">
        <div className="header">
          <h1 className="title">My Daily Diary</h1>
          <p className="subtitle">★토닥이의 피드백을 확인하세요★</p>

          <div className="dropdownContainer">
            <Select
              value={{ value: year, label: year }}
              onChange={handleYearChange}
              options={yearOptions}
              styles={selectStyles}
            />
            <Select
              value={{ value: month, label: month.toString().padStart(2, '0') }}
              onChange={handleMonthChange}
              options={monthOptions}
              styles={selectStyles}
            />
            <Select
              value={{ value: day, label: day.toString().padStart(2, '0') }}
              onChange={handleDayChange}
              options={dayOptions}
              styles={selectStyles}
            />
          </div>
        </div>

        <div className="original-content-section">
          <div className="original-title">My Diary Before Feedback</div>
          <div className="original-section">  
            <div className="original-content">{diaryEntry}</div>
          </div>
        </div>

        <div className="feedback-content-section">
          <div className="doctor-feedback-container">
            <div className="feedback-title">Doctor’s Feedback</div>
            <img src={talkingDoctor} alt="Doctor Feedback" className="doctor-image" />
          </div>
          <div className="feedback-section">
            <div className="doctor-feedback-content">{feedback}</div>
          </div>
        </div>

        <button className="okButton" onClick={handleOkButtonClick}>확인</button>

      </div>
    </div>    
  );
};

const selectStyles = {
  container: (base) => ({
    ...base,
    width: '25%',
    height: '40px',
    margin: '10px',
  }),
  control: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#000',
  }),
  menu: (base) => ({
    ...base,
    overflowY: 'auto',
  }),
};

export default DiaryFeedback;
