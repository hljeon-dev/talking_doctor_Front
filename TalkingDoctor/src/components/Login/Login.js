import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // 에러 상태
  const navigate = useNavigate();



  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      const loginData = {
        email,
        password
      };

      // 서버에 로그인 요청
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // 로그인 성공 시 처리
      if (response.status === 200) {
        const data = response.data;
        // JWT 토큰 로컬 스토리지 저장
        localStorage.setItem('token', data.token);
        navigate('/Main'); // 메인 페이지로 이동
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setError(true); // 로그인 실패 시 에러 표시
    }
  };

  const closeModal = () => {
    setError(false); // 모달 닫기
  };

  const handleSignup = () => {
    navigate('/SignUp');
  };

  return (
    <div className="login-container">
      {error && (
        <div className="modal">
          <div className="modal-content">
            <p>★아이디와 비밀번호를 확인하세요★</p>
            <button onClick={closeModal} className="close-button">확인</button>
          </div>
        </div>
      )}
      <h1>welcome!</h1>
      <p>토링닥터 토닥이가 사용자님을 도와드릴게요!</p>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="PW"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>LOGIN</button>
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
};

export default Login;
