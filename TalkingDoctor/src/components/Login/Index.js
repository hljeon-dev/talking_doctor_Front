import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';
import IndexBack from '../../assets/IndexBack.png'; // 이미지 파일 경로

const Index = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/SignUp');
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  return (
    <div className="index-container">
      <div className="header">
        <h1>welcome!</h1>
        <p>토킹닥터 토닥이가 사용자님을 도와드릴게요!</p>
      </div>
      <img src={IndexBack} alt="background" className="background-image" />
      <div className="overlay"></div> {/* 투명한 초록색 오버레이 */}
      
      <div className="button-container">
        <p>토닥이가 처음이라면</p>
        <button className="signup-button" onClick={handleSignupClick}> <e>SIGN UP</e> <k>회원가입</k></button>
        <button className="login-button" onClick={handleLoginClick}> <e>SIGN IN</e> <k>로그인</k></button>
      </div>
    </div>
  );
};

export default Index;
