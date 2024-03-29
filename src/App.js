import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './app/errorBoundary';
import About from './features/about/About';
import { Login } from './features/login/Login';
import Main from './features/main/Main';
import Mypage from './features/mypage/Mypage';
import PopupSample from './features/sample/PopupSample';
import { Sample } from './features/sample/Sample';
import TableSample from './features/sample/TableSample';
import DefaultLayout from './fragments/layout/DefaultLayout';
import LoginLayout from './fragments/layout/LoginLayout';
import TabLayout from './fragments/layout/TabLayout';
import Loading from './fragments/loading/Loading';
import NeedAuthPages from './fragments/NeedAuthPages';
import Popup from './fragments/popup/Popup';
import TimeoutAlert from './fragments/timeoutAlert/TimeoutAlert';
import { FileSample } from './features/sample/fileSample';


/* 
  ※ 설명

  create-react-app \프로젝트경로\ --template redux 를 통해 생성했습니다.
  redux template를 사용할 경우 redux tool kit을 사용하므로 이에 권장되는 구조인
  'redux state slice' 형태를 사용합니다. 이 형태는 store에 저장되는 reducer(전역변수)와
  api 호출, store에 있는 reducer 값을 변경하는 actions, component 자체의 templates를 
  한 곳에 뭉쳐서 사용하는데, 이 특징은 features/counter 경로에 예시로 잘 구현되어있습니다.
  
  features 하위에 있는 폴더들은 하나의 페이지라고 생각하시면 됩니다. 그 페이지에서 만들어진
  전역변수 (reducer)는 어디서든지 호출되어질 수 있으며(기존 react의 useState와 다르게), 
  어디서든 action를 통해 바꿀 수 있습니다. 이에 대한 예시는 login 페이지를 참조하시면
  쉽게 익히실 수 있으실 겁니다.

  react - redux(+redux toolkit)구조에 대해서는 구글에 검색하시면 쉽게 접하실 수 있으실겁니다.

  또한 이 어플리케이션은 MUI라는 UI 컴포넌트 툴을 사용합니다.
  디자인이 이미 되어있고 공통화가 잘되어있어 사용하기 편하실겁니다.
  컴포넌트들은 아래 주소에,
  https://mui.com/material-ui/react-text-field/
  템플릿 들은 아래 주소에 있습니다.
  https://mui.com/material-ui/getting-started/templates/
  아이콘은 아래 주소에 있습니다.
  https://mui.com/material-ui/material-icons/ 
*/



function App() {

  const setLang = ()=> {
    /**
     *  google admin console에서 정의한 language 코드를 그대로 사용합니다.
     *  https://developers.google.com/admin-sdk/directory/v1/languages?hl=en
     *  한국인 경우 ko, 영어인 경우 en 입니다.
     */
    if(!localStorage.getItem("Flang")) {
      localStorage.setItem("Flang", navigator.language.substring(0, 2));
    }
  }

  setLang();

  return (
    <>
    <ErrorBoundary>
      <Loading></Loading>
      <TimeoutAlert></TimeoutAlert>
      <Popup></Popup>
      <BrowserRouter>
        <Routes>
        <Route element={<DefaultLayout/>}>
          {/* Need Login */}
          <Route element={<NeedAuthPages/>}>
            <Route path="/mypage" element={<Mypage/>}></Route>  
          </Route>
          
          <Route path="/" element={<Main/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/sample" element={<Sample/>}></Route>
          <Route path="/tableSample" element={<TableSample/>}></Route>
          <Route path="/popupSample" element={<PopupSample/>}></Route>
          <Route path="/fileSample" element={<FileSample/>}></Route>
        </Route>
        <Route element={<LoginLayout/>}>
          <Route path="/login" element={<Login/>}></Route>
        </Route>
        <Route element={<TabLayout/>}>
          <Route path="/tabSample" element={<Sample/>}></Route>
          <Route path="/tabTableSample" element={<TableSample/>}></Route>
          <Route path="/tabPopupSample" element={<PopupSample/>}></Route>
          <Route path="/tabFileSample" element={<FileSample/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
    </>
  );
}

export default App;
