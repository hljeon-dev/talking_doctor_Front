import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import './DiaryWrite.css';
import axios from 'axios'
import feedbackDoctor from '../../assets/feedbackDoctor.png';

const DiaryWrite = ({ saveDiary }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || new Date();

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

  const handleCancel = () => {
    navigate('/DiaryMain');
  };

  const handleSave = async() => {
    //saveDiary({ year, month, day, content });
    const diaryAddData = {content};
    const response = await axios.post('http://localhost:8080/api/diary/add',diaryAddData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
    
    navigate('/DiaryMain');
  };

  
  const openFeedback = () => {
    navigate('/DiaryFeedback');
  }

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption.value);
  };

  const handleDayChange = (selectedOption) => {
    setDay(selectedOption.value);
  };

  return (
    <div className="diary-write-container">
      <div className="diaryWrite">
        <div className="header">
          <h1 className="title">My Daily Diary</h1>
          <p className="subtitle">자유롭게 오늘의 일기를 작성해보세요!</p>
          
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

        <div className="diary-content-wrapper">
          <textarea
            className="diary-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘의 일기를 작성하세요..."
          />
          <div className="diary-footer">
            <button className="cancel-button" onClick={handleCancel}>작성 취소</button>
            <button className="save-button" onClick={handleSave}>작성 완료</button>
          </div>
        </div>
      </div>

      <button className="feedback-button" onClick={openFeedback}>
        <img src={feedbackDoctor} alt="Feedback" className="feedback-image" />
        피드백 받기
      </button>
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

export default DiaryWrite;
