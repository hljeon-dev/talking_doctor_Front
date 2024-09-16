import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';
import './DiaryView.css';
import feedbackDoctor from '../../assets/feedbackDoctor.png';
import axios from 'axios';

const DiaryView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const entry = location.state?.entry; // DiaryMain에서 전달된 일기 데이터

  const selectedDate = location.state?.selectedDate || new Date();

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부를 관리하는 상태
  const [content, setContent] = useState(''); // 일기 내용을 관리하는 상태
  const [showRewriteModal, setShowRewriteModal] = useState(false); // 수정 완료 모달 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 완료 모달 상태
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false); // 삭제 확인 모달 상태

  const [year, setYear] = useState(selectedDate.getFullYear());
  const [month, setMonth] = useState(selectedDate.getMonth() + 1);
  const [day, setDay] = useState(selectedDate.getDate());

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

  useEffect(() => {
    if (entry?.content) {
      setContent(entry.content); // entry.content를 초기값으로 설정
    }
  }, [entry]);

  /* 모달 닫기 함수 */
  const closeRewriteModal = () => {
    setShowRewriteModal(false); // 수정 모달 닫기
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false); // 삭제 완료 모달 닫기
    navigate('/DiaryMain'); // 일기 삭제 후 메인 페이지로 리다이렉트
  };

  const closeConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false); // 삭제 확인 모달 닫기
  };

  /*취소 버튼*/
  const handleCancel = () => {
    navigate('/DiaryMain');
  };

  /*수정 버튼*/
  const handleRewrite = async () => {
    if (isEditing) {
      try {
        const diaryUpdateRequest = {
          content: content, // 수정된 내용 전송
        };

        const response = await axios.put(
          `http://localhost:8080/api/diary/update/${entry.diaryId}`, // 백엔드 수정 엔드포인트
          diaryUpdateRequest,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // 토큰 필요 시
            },
          }
        );
        setIsEditing(false); // 수정 모드에서 벗어남
        setShowRewriteModal(true); // 수정 완료 모달을 보여줌
      } catch (error) {
        console.error('일기 수정 중 오류가 발생했습니다:', error);
        alert('일기 수정 중 오류가 발생했습니다.');
      }
    } else {
      setIsEditing(true); // 수정 모드로 전환
    }
  };

  /* 삭제 확인 모달을 띄우는 함수 */
  const confirmDelete = () => {
    setShowConfirmDeleteModal(true); // 삭제 확인 모달을 보여줌
  };

  /* 삭제 수행 함수 */
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/diary/delete/${entry.diaryId}`, // 백엔드 삭제 엔드포인트
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // 토큰 필요 시
          },
        }
      );
      setShowConfirmDeleteModal(false); // 삭제 확인 모달 닫기
      setShowDeleteModal(true); // 삭제 완료 모달을 보여줌
    } catch (error) {
      console.error('일기 삭제 중 오류가 발생했습니다:', error);
      alert('일기 삭제 중 오류가 발생했습니다.');
    }
  };

  /*피드백 버튼*/
  const openFeedback = () => {
    // entry의 내용을 DiaryFeedback 페이지로 전달
    navigate('/DiaryFeedback', { 
      state: { 
        selectedDate: entry?.date || selectedDate, 
        diaryEntry: entry?.content || '작성한 일기가 없습니다.' 
      } 
    });
  };

  return (
    <div className="diary-view-container">
      <div className="diaryView">
        <div className="header">
          <h1 className="title">My Daily Diary</h1>
          <p className="subtitle">{entry ? `${selectedDate.toLocaleDateString()}에 작성된 일기` : '일기를 불러오지 못했습니다.'}</p> {/* 일기 작성 시간 표시 */}

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
          {!isEditing ? (
            // 수정 모드가 아닌 경우: 텍스트로 일기 내용 표시
            <div className="diary-content">
              {content || '작성된 일기가 없습니다.'}
            </div>
          ) : (
            // 수정 모드인 경우: textarea로 내용 수정 가능
            <textarea
              className="diary-content"
              value={content} // 수정된 상태 값을 textarea에 반영
              onChange={(e) => setContent(e.target.value)} // 사용자가 입력한 값을 content 상태에 반영
              placeholder="오늘의 일기를 작성하세요..."
            />
          )}
          <div className="diary-footer">
            <button className="view-cancel-button" onClick={handleCancel}>뒤로가기</button>
            <button className="view-rewrite-button" onClick={handleRewrite}>
              {isEditing ? '저장' : '수정'} {/* 수정 모드에 따라 버튼 텍스트 변경 */}
            </button>
            <button className="view-delete-button" onClick={confirmDelete}>삭제</button> {/* 삭제 대신 삭제 확인 모달을 띄움 */}
          </div>
        </div>

        <button className="feedback-button" onClick={openFeedback}>
          <img src={feedbackDoctor} alt="Feedback" className="feedback-image" />
          피드백 받기
        </button>
      </div>

      {/* 수정 완료 모달 */}
      {showRewriteModal && (
        <div className="rewrite-modal-overlay">
          <div className="rewrite-modal-content">
            <h3>일기 수정이 완료되었습니다.</h3>
            <button className="rewrite-modal-button" onClick={closeRewriteModal}>확인</button>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {showConfirmDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h3>정말로 삭제하시겠습니까?</h3>
            <button className="delete-modal-button" onClick={handleDelete}>확인</button>
            <button className="delete-modal-button" onClick={closeConfirmDeleteModal}>취소</button>
          </div>
        </div>
      )}

      {/* 삭제 완료 모달 */}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h3>일기가 삭제되었습니다.</h3>
            <button className="delete-modal-button" onClick={closeDeleteModal}>확인</button>
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

export default DiaryView;
