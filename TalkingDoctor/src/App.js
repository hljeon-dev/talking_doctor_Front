import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Index from './components/Login/Index';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import Main from './components/Login/Main';

import DiaryMain from './components/Diary/DiaryMain';
import DiaryWrite from './components/Diary/DiaryWrite';
import DiaryFeedback from './components/Diary/DiaryFeedback';
import DiaryView from './components/Diary/DiaryView';



function App() {
  const [diaries, setDiaries] = useState([]);

  const saveDiary = (diary) => {
    setDiaries([...diaries, diary]);
    // 추가적으로 로컬 스토리지 저장, 서버 저장 등 필요한 로직 추가 가능
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Main" element={<Main />} />

        <Route path="/DiaryMain" element={<DiaryMain />} />
        <Route path="/DiaryWrite" element={<DiaryWrite saveDiary={saveDiary} />} />
        <Route path="/DiaryFeedback" element={<DiaryFeedback />} />
        <Route path="/DiaryView" element={<DiaryView />} />
      </Routes>
    </Router>
  );
}

export default App;
