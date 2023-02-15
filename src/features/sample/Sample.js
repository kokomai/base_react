import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setId,
  setName
} from './userSlice';
import styles from './Login.module.css';
import useReq from '../../app/request';
import ValidInput from '../../components/input/ValidInput';
import { COMM } from '../../app/common';

export function Sample() {
  const [num, setNum] = useState('5');
  const [kor, setKor] = useState('5');
  const [isValid, setIsValid] = useState(false);

  // 공통 호출 함수인 req를 아래와 같이 선언해줍니다.
  // You shuould define common API Call function as like this
  const req = useReq();

  // ※ 동기화 호출이 필요 한 경우 async를 함수 앞에 선언해줍니다.
  // 다른 예 ) let TryLogin = async function() {}
  // ※ If you wanna call API function as synchrously, define 'async' at front of function
  // another example ) let TryLogin = async function() {}
  const onclick = async () => {

    await req.post(
      {
        url: '/api/getError',
        params: {'id' : 'test', 'pw' : 'pw1234'},
        error: function(err) {
          // 응답 실패시
          // when response returned error
          alert(JSON.stringify(err) + 'ttt');
        },
        // noLoading: true, // 설정시 로딩 안보여주기 // if you define this, it should not show the loading.
        keepLoading: true // 설정시 api 값을 받아오더라도 계속 로딩 // if you define this, loading will keep showing even the api call is ended.
      }
    )

    await req.post(
      {
        url: '/api/getUser',
        params: {'id' : 'test', 'pw' : 'pw1234'},
        success: function(res) {
          alert(JSON.stringify(res));
        },
        error: function(err) {
          alert(JSON.stringify(err) + 'tttttt');
        },
        keepLoading: true
      }
    )

    await req.get(
      {
        url: '/api/callGet',
        params: {'id' : 'get방식아이디', 'pw' : 'get방식 pw'},
        success: function(res) {
        
          alert(JSON.stringify(res));
        },
        error: function(err) {
          
          alert(JSON.stringify(err) + 'tttttt');
        },
        keepLoading: true
      }
    )

    req.post(
      {
        url: '/api/getUser',
        params: {'id' : 'async ID1', 'pw' : 'async pw2'},
        success: function(res) {
          console.log(res);
        },
        error: function(err) {
          console.log(err);
        },
      }
    )

    req.post(
      {
        url: '/api/getUser',
        params: {'id' : 'async ID2', 'pw' : 'async pw2'},
        success: function(res) {
          console.log(res);
        },
        error: function(err) {
          console.log(err);
        },
      }
    )

    
  }

  return (
    <div>
      valid check test1 (NUM) : <ValidInput type={'tel'} value={num} setValue={setNum} valid={COMM.isNum} ></ValidInput>
      <br></br>
      valid check test2 (KOR): <ValidInput value={kor} setValue={setKor} valid={COMM.isKor} stopInput={true} msg={'한국어만 입력해주세요.'}></ValidInput>
      <br></br><br></br>
      <button onClick={onclick}>LOG IN</button>
    </div>
  );
}
