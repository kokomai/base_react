import { ConstructionOutlined } from "@mui/icons-material";
import { Backdrop, Box, Button, Card, CardActions, CardContent, IconButton, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import * as React from 'react';
import { useNavigate } from 'react-router';
import { COMM } from "../../app/common";
import usePopup from "../../app/popup";
import CloseIcon from '@mui/icons-material/Close';
import Mypage from "../mypage/Mypage";

function CustomPopup({isShow, setIsShow}) {

  return (
    <>
      <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isShow}
        >
            <Card sx={{ minWidth: "50%", minHeight: "60%"}}>
                <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setIsShow(false);
                      }}
                      sx={{marginLeft: 'auto'}}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      놀랍게도
                    </Typography>
                    <Typography variant="body2">
                      아래와 같이 페이지 자체를 컴포넌트 처럼 넣을 수 있습니다.
                      현재는 Mypage를 넣어보았습니다.
                    </Typography>
                    <hr></hr>
                    {/* 마이페이지를 그대로 넣을 수도 있습니다 컴포넌트 처럼.. */}
                    <Mypage></Mypage>
                    
                </CardContent>
            </Card>
        </Backdrop>
    </>
  )
}

export default function PopupSample() {
  /**
   *  input에 입력된 값을 alert, confirm에 사용하려고 선언한 것입니다.
   *  단순히 alert, confirm을 호출하실 떄에는 문자열만 사용하셔도 무방합니다.
   */
  const [alertTitle, setAlertTitle] = React.useState("테스트");
  const [alertText, setAlertText] = React.useState("테스트입니다");
  const [confirmTitle, setConfirmTitle] = React.useState("테스트 컨펌");
  const [confirmText, setConfirmText] = React.useState("테스트 컨펌 입니다..");
  const [isPopShow, setIsPopShow] = React.useState(false);
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
      <CustomPopup isShow={isPopShow} setIsShow={setIsPopShow}></CustomPopup>
      <Button variant="contained" color="primary" sx={{margin:"1%"}} onClick={()=>{setIsPopShow(true);}}>커스텀 팝업 호출</Button>
      <hr></hr>
      <hr></hr>
      <Button variant="contained" color="secondary" onClick={()=>{nav("/sample")}}>Sample 홈으로..</Button>
    </Box>
  );
}
