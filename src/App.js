import React from 'react';
import './App.css';
import { Login } from './features/login/Login'; 
import Main from './features/main/Main'
import Mypage from './features/mypage/Mypage';
import { Route, Routes } from 'react-router';
import NeedAuthPages from './fragments/NeedAuthPages';
import Loading from './fragments/loading/Loading';
import DefaultLayout from './fragments/layout/DefaultLayout';
import { BrowserRouter } from 'react-router-dom';
import LoginLayout from './fragments/layout/LoginLayout';
import ErrorBoundary from './app/errorBoundary';

function App() {
  return (
    <>
    <ErrorBoundary>
      <Loading></Loading>
      <BrowserRouter>
        <Routes>
        <Route element={<DefaultLayout/>}>
          {/* 로그인 필요 */}
          <Route element={<NeedAuthPages/>}>
            <Route path="/mypage" element={<Mypage/>}></Route>  
            <Route path="/mypage2" element={<Main/>}></Route>  
          </Route>
          
          <Route path="/" element={<Main/>}></Route>
          <Route path="/about"></Route>
        </Route>
        <Route element={<LoginLayout/>}>
          <Route path="/login" element={<Login/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
    </>
  );
}

export default App;
