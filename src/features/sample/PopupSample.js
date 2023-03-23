import { ConstructionOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as React from 'react';
import { useNavigate } from 'react-router';
import { COMM } from "../../app/common";
import usePopup from "../../app/popup";

export default function PopupSample() {
  const [alertTitle, setAlertTitle] = React.useState("테스트");
  const [alertText, setAlertText] = React.useState("테스트입니다");
  const [confirmTitle, setConfirmTitle] = React.useState("테스트 컨펌");
  const [confirmText, setConfirmText] = React.useState("테스트 컨펌 입니다..");
  const nav = useNavigate();
  const pop = usePopup();

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

  function confirmAgree() {
    alert("컨펌 확인입니다. 확인 클릭시 실행");
  }

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