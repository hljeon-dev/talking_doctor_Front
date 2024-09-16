import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DiaryView.css';

const DiaryView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entry = location.state?.entry; // DiaryMain에서 전달된 일기 데이터

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

export default DiaryView;
