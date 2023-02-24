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
import About from './features/about/About';
import { Sample } from './features/sample/Sample';
import TimeoutAlert from './fragments/timeoutAlert/TimeoutAlert';

/**
 * 
 *  This application basically using MUI components
 *  You can always reference to use MUI components at
 *  https://mui.com/material-ui/react-text-field/
 *  Also MUI provide various templates at
 *  https://mui.com/material-ui/getting-started/templates/
 *  Icons at
 *  https://mui.com/material-ui/material-icons/
 */

function App() {
  return (
    <>
    <ErrorBoundary>
      <Loading></Loading>
      <TimeoutAlert></TimeoutAlert>
      <BrowserRouter>
        <Routes>
        <Route element={<DefaultLayout/>}>
          {/* Need Login */}
          <Route element={<NeedAuthPages/>}>
            <Route path="/mypage" element={<Mypage/>}></Route>  
          </Route>
          
          <Route path="/" element={<Main/>}></Route>
          <Route path="/sample" element={<Sample/>}></Route>
          <Route path="/about" element={<About/>}></Route>
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
