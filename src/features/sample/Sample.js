import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { COMM } from '../../app/common';
import useReq from '../../app/request';
import ValidInput from '../../components/input/ValidInput';

export function Sample() {
  const [num, setNum] = useState('5');
  const [kor, setKor] = useState('5');
  const nav = useNavigate();

  // 공통 호출 함수인 req를 아래와 같이 선언해줍니다.
  const req = useReq();

  // ※ 동기화 호출이 필요 한 경우 async를 함수 앞에 선언해줍니다.
  // 다른 예 ) const example = async function() { await req.post(~~~)}
  const onclick = async () => {

    await req.post(
      {
        url: '/api/user/getError',
        params: {'id' : 'test', 'pw' : 'pw1234'},
        error: function(err) {
          // 응답 실패시
          alert("에러: " + JSON.stringify(err));
        },
        // noLoading: true, // 설정시 로딩 안보여주기 
        keepLoading: true // 설정시 api 값을 받아오더라도 계속 로딩 
      }
    )

    await req.post(
      {
        url: '/api/user/getUser',
        params: {'id' : 'test', 'pw' : 'pw1234'},
        success: function(res) {
          alert(JSON.stringify(res));
        },
        error: function(err) {
          alert(JSON.stringify(err));
        },
        keepLoading: true
      }
    )

    await req.get(
      {
        url: '/api/user/callGet',
        params: {'id' : 'get방식아이디', 'pw' : 'get방식 pw'},
        success: function(res) {
          alert(JSON.stringify(res));
        },
        error: function(err) {
          
          alert(JSON.stringify(err));
        },
        keepLoading: true
      }
    )

    // 아래는 await이 없으므로 비동기식으로 호출
    req.post(
      {
        url: '/api/user/getUser',
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
        url: '/api/user/getUser',
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
      <hr></hr>
      <button onClick={onclick}>API 호출 테스트 JS파일 내 주석 확인 요망</button>
      <hr></hr>
      <Button variant="contained" color="primary" onClick={()=>{nav('/tableSample')}}>Table 샘플 페이지로</Button>
      <Button variant="contained" color="secondary" onClick={()=>{nav('/popupSample')}} sx={{margin:"3px"}}>popup 샘플 페이지로</Button>
      <Button variant="contained" color="warning" onClick={()=>{nav('/fileSample')}} sx={{margin:"3px"}}>파일 업로드 페이지로</Button>
    </div>
  );
}
