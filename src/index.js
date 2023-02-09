import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

/* 
  ※ foresys react-base 설명

  create-react-app \프로젝트경로\ --template redux 를 통해 생성했습니다.
  redux template를 사용할 경우 redux tool kit을 사용하므로 이에 권장되는 구조인
  'redux state slice' 형태를 사용합니다. 이 형태는 store에 저장되는 reducer(전역변수)와
  api 호출, store에 있는 reducer 값을 변경하는 actions, component 자체의 templates를 
  한 곳에 뭉쳐서 사용하는데, 이 특징은 features/counter 경로에 예시로 잘 구현되어있습니다.
  
  features 하위에 있는 폴더들은 하나의 페이지라고 생각하시면 됩니다. 그 페이지에서 만들어진
  전역변수 (reducer)는 어디서든지 호출되어질 수 있으며(기존 react의 useState와 다르게), 
  어디서든 action를 통해 바꿀 수 있습니다. 이에 대한 예시는 main과 test페이지를 참조하시면
  쉽게 익히실 수 있으실 겁니다.
*/



