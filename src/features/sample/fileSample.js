import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import useReq from '../../app/request';

export function FileSample() {
    // file input 그 자체의 객체입니다. 실제로 사용하진 않고, fileArr로 변환하는데에만 사용합니다.
    const [files, setFiles] = useState([]);
    // 서버로 전송할 file리스트입니다. file 객체를 리스트 형식으로 담고 있습니다.
    const [fileArr, setFileArr] = useState([]);
    // 리스트 상 삭제할 파일 리스트 입니다.
    const [fileSelected, setFileSelected] = useState([]);

    // 공통 호출 함수인 req를 아래와 같이 선언해줍니다.
    const req = useReq();

    // input 자체를 컨트롤 할 때 사용하는 hook입니다. 아래 input 내 ref 속성에서 사용합니다.
    const fileInput = useRef(null);

    // button 클릭시, file input이 클릭되게 컨트롤합니다.
    const fileUpload = e => {
        fileInput.current.click();
    }
    // console.log(test.tet);
    const fileRequest = e => {
        // ※ 파일 저장 테스트시, 백엔드 서버를 실행하는 STS를 관리자권한으로 실행해 주시길 바랍니다.
        req.file({
            url: "/api/user/sampleFileUpload",
            params: {
                pathName : "C://test/"
            },
            files : fileArr,
            success: function(res) {
                setFileArr([]);
            }
        })
    }

    const removeFiles = e => {
        // 삭제할 파일 리스트에 있는 인덱스를 파일 리스트에서 지워줍니다.
        setFileArr(fileArr.filter((file, i) => !fileSelected.includes(i)));
    }

    const fileSelect = (checked, idx) => {
        if(checked && !fileSelected.includes(idx)) {
            // 체크가 true이며 삭제할 리스트에 값이 없을 경우 기존 삭제 리스트에 추가하여 넣어줍니다. 
            setFileSelected([...fileSelected, idx]);    
        } else if(!checked) {
            // 체크가 false일 때에는 삭제할 리스트에서 지워줍니다. filter를 사용..
            setFileSelected(fileSelected.filter((i) => i !== idx));
        }
    }

    useEffect(()=> {
        // input 자체의 파일 객체가 바뀌면, 파일 리스트, 삭제하려고 선택한 리스트를 초기화 합니다. 
        const newArr = Array.from(files);
        setFileArr(newArr);
        setFileSelected([]);
    }, [files])

    useEffect(()=> {
        // 실제 사용할 파일 리스트가 변경되었을 경우 삭제할 파일 리스트를 초기화 해줍니다.
        setFileSelected([]);
    }, [fileArr])


    return (
        <div>
            <input 
                type="file" 
                ref={fileInput} 
                multiple={true} 
                style={{display: "none"}}
                onChange={(e) => {setFiles(e.target.files);}}
            ></input>
            <Button variant="contained" color="secondary" onClick={()=>{fileUpload()}} sx={{margin:"3px"}}>파일 업로드</Button>
            <FormGroup>
                {fileArr.length > 0 
                    ?
                    <>
                    {
                    fileArr.map((file, idx) => (
                        <FormControlLabel key={file.name + idx} control={<Checkbox onChange={(e) => {fileSelect(e.target.checked, idx)}}/>} label={file.name} />
                    ))
                    }
                    <Button variant="contained" color="error" onClick={()=>{removeFiles()}} sx={{margin:"2px"}}>선택 파일 삭제</Button>
                    </>
                    :
                    <></>
                }
            </FormGroup>
            <hr></hr>
            <Button variant="contained" color="primary" onClick={()=>{fileRequest()}} sx={{margin:"3px"}}>파일 전송</Button>
        </div>
    );
}
