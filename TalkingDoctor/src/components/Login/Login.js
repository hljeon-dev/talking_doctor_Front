import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // 에러 상태
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 로직 구현 (예: DB와 연동)
    if (id !== "ddd" || password !== "ddd") {
      setError(true);
    } else {
      navigate('/Main'); // 로그인 성공 시 메인 페이지로 이동
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
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
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
