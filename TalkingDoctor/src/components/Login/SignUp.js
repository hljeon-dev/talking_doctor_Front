// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [emailLocal, setEmailLocal] = useState(''); // 이메일 '@' 앞부분
  const [emailDomain, setEmailDomain] = useState('naver.com'); // 선택할 도메인 부분
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [createdDate, setCreatedDate] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {

    let newErrors = {};
    if (!nickname) newErrors.nickname = true;
    if (!lastname) newErrors.lastname = true;
    if (!firstname) newErrors.firstname = true;
    if (!emailLocal) newErrors.emailLocal = true;
    if (!password) newErrors.password = true;
    if (password !== confirmPassword) {
      newErrors.confirmPassword = true;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const fullEmail = `${emailLocal}@${emailDomain}`;
      console.log('Full Email:', fullEmail); // 이메일이 제대로 합쳐졌는지 확인

      const registerData = {
        userName : nickname,
        lastName : lastname,
        firstName : firstname,
        email: fullEmail, // email 필드로 보내는지 확인
        password
      };

      console.log('Register Data:', registerData);

      const response = await axios.post('http://localhost:8080/api/auth/register', registerData, {
        headers: {
          'Content-Type': 'application/json'
          //'Authorization': `Bearer ${token}`
        }});
  
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authToken', data.token); // JWT 토큰 로컬 스토리지 저장
        // alert('회원가입 성공을 축하합니다');
        // navigate('/login');
        navigate('/Login'); // 회원가입 성공 시 로그인 페이지로 이동
      }

    }
  };

  return (
    <div className="signup-container">
      <h1>welcome!</h1>
      <p>아래의 서식을 작성하여 회원가입을 완료하세요</p>
      <input 
        type="text" 
        placeholder="닉네임" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)} 
        className={errors.nickname ? 'error' : ''}
      />
      <input 
        type="text" 
        placeholder="성" 
        value={lastname} 
        onChange={(e) => setLastname(e.target.value)} 
        className={errors.lastname ? 'error' : ''}
      />
      <input 
        type="text" 
        placeholder="이름" 
        value={firstname} 
        onChange={(e) => setFirstname(e.target.value)} 
        className={errors.firstname ? 'error' : ''}
      />
      <div className="email-input">
          <input 
            type="text" 
            placeholder="이메일" 
            value={emailLocal} 
            onChange={(e) => setEmailLocal(e.target.value)} 
            className={errors.emailLocal ? 'error' : ''}
          />
          <span>@</span>
          <select 
            value={emailDomain} 
            onChange={(e) => setEmailDomain(e.target.value)} 
            className="email-domain-select"
          >
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            <option value="daum.net">daum.net</option>
            <option value="yahoo.com">yahoo.com</option>
          </select>
      </div>
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className={errors.password ? 'error' : ''}
      />
      <input 
        type="password" 
        placeholder="비밀번호 확인" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        className={errors.confirmPassword ? 'error' : ''}
      />
      <button onClick={handleSignup}>회원가입</button>
      <button onClick={() => navigate('/')}>취소</button>
    </div>
  );
};

export default Signup;
