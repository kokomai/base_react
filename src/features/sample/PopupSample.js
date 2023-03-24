import { ConstructionOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { useNavigate } from 'react-router';
import { COMM } from "../../app/common";
import usePopup from "../../app/popup";

export default function PopupSample() {
  /**
   *  input에 입력된 값을 alert, confirm에 사용하려고 선언한 것입니다.
   *  단순히 alert, confirm을 호출하실 떄에는 문자열만 사용하셔도 무방합니다.
   */
  const [alertTitle, setAlertTitle] = React.useState("테스트");
  const [alertText, setAlertText] = React.useState("테스트입니다");
  const [confirmTitle, setConfirmTitle] = React.useState("테스트 컨펌");
  const [confirmText, setConfirmText] = React.useState("테스트 컨펌 입니다..");
  const nav = useNavigate();

  /**
   * 공용 alert, confirm을 함수형태로 사용하기 위해서는
   * usePop이란 custom hook을 선언 및 초기화 해야합니다.
   *  */ 
  const pop = usePopup();


  /**
   * alert에서 확인 버튼 누를 시 실행될 함수입니다.
   * 간단한 로직일 경우 익명함수(function(){}, ()=>{})를 사용하셔도 무방합니다.
   */
  function alertConfirm() {
    alert("알럿 확인입니다. 확인 클릭시 실행");
  }

  const alertTest = ()=> {
    /**
     * title => alert 타이틀 (default: "안내")
     * text => alert 내용
     * btn => 버튼 텍스트 (default: "확인")
     * onConfirm => 확인버튼 누를 시 실행할 함수
     */
    pop.alert({title: alertTitle, text: alertText, btn: '확인입니다.', onConfirm: alertConfirm});
  }

  const alertTest2 = ()=> {
      pop.alert({title: alertTitle, text: alertText, btn: '두번째 띄우기', onConfirm: function() {
        pop.alert({title: alertTitle+"2", text: alertText+"2", btn: '확인입니다.', onConfirm: alertConfirm});
      }});
  }

  /**
   * confirm에서 확인 버튼 누를 시 실행될 함수입니다.
   * 간단한 로직일 경우 익명함수(function(){}, ()=>{})를 사용하셔도 무방합니다.
   */
  function confirmAgree() {
    alert("컨펌 확인입니다. 확인 클릭시 실행");
  }

  /**
   * confirm에서 취소 버튼 누를 시 실행될 함수입니다.
   * 간단한 로직일 경우 익명함수(function(){}, ()=>{})를 사용하셔도 무방합니다.
   */
  function confirmCancel() {
    alert("컨펌 취소입니다. 취소 클릭시 실행");
  }

  const confirmTest = ()=> {
    /**
     * title => alert 타이틀 (default: "확인")
     * text => alert 내용
     * btn => 버튼 텍스트 (default: "확인")
     * onConfirm => 확인버튼 누를 시 실행할 함수
     * onCancel => 취소 버튼 누를 시 실행할 함수
     */
    pop.confirm({
      title: confirmTitle, 
      text: confirmText, 
      confirmBtn: '확인!!', 
      cancelBtn: '취소!!!',
      onConfirm: confirmAgree,
      onCancel: confirmCancel
    });
  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          팝업 테스트 입니다. 디자인은 Popup.js에서 변경 가능합니다.
      </Typography>
      <Box sx={{ width: '30%', margin: "1%"}}>
        <TextField
            margin="normal"
            fullWidth
            label="Alert 타이틀"
            defaultValue={alertTitle}
            onChange={(e)=>{setAlertTitle(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="Alert 내용"
            defaultValue={alertText}
            onChange={(e)=>{setAlertText(e.target.value)}}
            autoFocus
          />
      </Box>
      
      <Button variant="contained" color="primary" sx={{margin:"1%"}} onClick={()=>{alertTest();}}>공용 Alert</Button>
      <Button variant="contained" color="primary" sx={{margin:"1%"}} onClick={()=>{alertTest2();}}>공용 Alert 여러번 띄우기</Button>
      <hr></hr>
      <Box sx={{ width: '30%', margin: "1%"}}>
        <TextField
            margin="normal"
            fullWidth
            label="Confirm 타이틀"
            defaultValue={confirmTitle}
            onChange={(e)=>{setConfirmTitle(e.target.value)}}
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm 내용"
            defaultValue={confirmText}
            onChange={(e)=>{setConfirmText(e.target.value)}}
            autoFocus
          />
      </Box>
      
      <Button variant="contained" color="primary" sx={{margin:"1%"}} onClick={()=>{confirmTest();}}>공용 Confirm</Button>
      <hr></hr>
      <hr></hr>
      <Button variant="contained" color="secondary" onClick={()=>{nav("/sample")}}>Sample 홈으로..</Button>
    </Box>
  );
}