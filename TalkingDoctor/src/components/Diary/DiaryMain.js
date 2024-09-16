import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import './DiaryMain.css';

//DB연동되면서 수정해야할 사항
const mockDiaryEntries = {
  '2024-08-20': [
    { time: '13:25', content: 'Today was quite eventful...' },
    { time: '22:30', content: 'I finally found my ...' },
  ],
  '2024-08-31': [{ time: '10:00', content: 'Had a relaxing day ...' }],
};

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => ({
  value: currentYear - i,
  label: (currentYear - i).toString(),
}));

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: (i + 1).toString().padStart(2, '0'),
}));

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DiaryMain = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [diaryPopup, setDiaryPopup] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const diaryEntries = mockDiaryEntries;

  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
    setCurrentDate(new Date(selectedOption.value, selectedMonth - 1));
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
    setCurrentDate(new Date(selectedYear, selectedOption.value - 1));
  };

  const handleWriteButtonClick = () => {
    navigate('/DiaryWrite', { state: { selectedDate: currentDate } }); // 선택한 날짜를 DiaryWrite로 전달
  };

  const handleDayClick = (value, event) => {
    const dateStr = formatDate(value);
    if (diaryEntries[dateStr]) {
      const rect = event.target.getBoundingClientRect();
      setPopupPosition({ top: rect.top + window.scrollY, left: rect.right + 10 });
      setDiaryPopup({ date: dateStr, entries: diaryEntries[dateStr] });
    } else {
      setDiaryPopup(null);
    }
    setCurrentDate(value);
  };

  const closeDiaryPopup = () => {
    setDiaryPopup(null);
  };

  const handleDiaryClick = (entry) => {
    navigate('/DiaryView', { state: { entry } });
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setSelectedYear(activeStartDate.getFullYear());
    setSelectedMonth(activeStartDate.getMonth() + 1);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = formatDate(date);
      const entriesCount = diaryEntries[dateStr] ? diaryEntries[dateStr].length : 0;
      return <div className="diary-marker">{'●'.repeat(entriesCount)}</div>;
    }
  };

  return (
    <div className="diaryMain">
      <div className="header">
        <h1 className="title">My Daily Diary</h1>
        <p className="subtitle">오늘은 어떤 일이 있으셨나요?</p>

        <div className="dropdownContainer">
          <Select
            value={{ value: selectedYear, label: selectedYear }}
            onChange={handleYearChange}
            options={yearOptions}
            styles={selectStyles}
          />
          <Select
            value={{ value: selectedMonth, label: selectedMonth }}
            onChange={handleMonthChange}
            options={monthOptions}
            styles={selectStyles}
          />
          <button className="writeButton" onClick={handleWriteButtonClick}>일기 쓰기 </button>
        </div>
      </div>

      <div ref={calendarRef}>
        <Calendar
          value={currentDate}
          defaultView="month"
          onClickDay={(value, event) => handleDayClick(value, event)}
          locale="ko-KR"
          tileContent={tileContent}
          className="responsiveCalendar"
          onActiveStartDateChange={handleActiveStartDateChange} // 달력의 활성 날짜가 바뀔 때 실행
        />
      </div>
      
      {diaryPopup && (
        <div
          className="diaryPopup"
          style={{ position: 'absolute', top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="popupHeader">
            <span>{diaryPopup.date} 일기 목록</span>
            <button className="closeButton" onClick={closeDiaryPopup}>X</button>
          </div>
          <div className="popupContent">
            {diaryPopup.entries.map((entry, index) => (
              <div key={index} className="diaryEntry" onClick={() => handleDiaryClick(entry)}>
                <span>{entry.time}</span> - <span>{entry.content.slice(0, 20)}...</span>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default DiaryMain;
