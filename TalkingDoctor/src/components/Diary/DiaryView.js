import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import './DiaryView.css';

const DiaryView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entry = location.state?.entry; // DiaryMain에서 전달된 일기 데이터

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

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption.value);
  };

  const handleDayChange = (selectedOption) => {
    setDay(selectedOption.value);
  };

  const handleCancel = () => {
    navigate('/DiaryMain');
  };

  const handleRewrite = () => {
    
  }

  const handleDelete = () => {

  }

  return (
    <div className="diary-view-container">
      <div className="diaryView">
        <div className="header">
          <h1 className="title">My Daily Diary</h1>
          <p className="subtitle">{entry ? `${entry.time}에 작성된 일기` : '일기를 불러오지 못했습니다.'}</p> {/* 일기 작성 시간 표시 */}

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
          <div className="diary-content">
            {entry ? entry.content : '일기 내용이 없습니다.'} {/* 일기 내용 표시 */}
          </div>
          <div className="diary-footer">
            <button className="cancel-button" onClick={handleCancel}>취소</button>
            <button className="rewrite-button" onClick={handleCancel}>수정</button>
            <button className="delete-button" onClick={handleCancel}>삭제</button>
          </div>
        </div>
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

export default DiaryView;
