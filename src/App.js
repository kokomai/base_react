import React from 'react';
import './App.css';
import { Login } from './features/login/Login'; 
import Main from './features/main/Main'
import { Mypage } from './features/mypage/Mypage';
import { Router, Route, Routes } from 'react-router';
import NeedAuthPages from './fragments/NeedAuthPages';
import Loading from './fragments/loading/Loading';
import DefaultLayout from './fragments/layout/DefaultLayout';
import HeadlessLayout from './fragments/layout/HeadlessLayout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
    <Loading></Loading>
    <BrowserRouter>
      <Routes>
      <Route element={<DefaultLayout/>}>
        {/* 로그인 필요 */}
        <Route element={<NeedAuthPages/>}>
          <Route path="/mypage" element={<Main/>}></Route>  
        </Route>
        
        <Route path="/" element={<Main/>}></Route>
        <Route path="/about"></Route>
      </Route>
      <Route element={<HeadlessLayout/>}>
        <Route path="/login" element={<Login/>}></Route>
      </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
