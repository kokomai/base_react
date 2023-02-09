/**
 *  ValidInput.js
 *  - input with validation
 */

import { useEffect, useState } from "react";

const ValidInput = ({value, setValue, valid, msg, type}) => {
    const [isNotValid, setIsNotValid] = useState(true);
    
    useEffect(()=>{
        let e = {
            'target' : {
                'value' : value 
            }
        };
        validCheck(e);
    },[]);

    const validCheck = (e) => {
        let val = e.target.value;

        if(e.target.value.length === 0) {
            setIsNotValid(false);
            setValue(val);
            return;
        }

        if(typeof valid === 'function') {
            if(valid(val)) {
                setIsNotValid(false);
            } else {
                setIsNotValid(true);
            }
        } else {
            console.error('valid 함수를 넣어주세요');
        }

        setValue(val);
    }
    
    return (
    <>
        <input type={type ? type : 'text'} value={value} onInput={(e)=>{validCheck(e)}}></input>
        { isNotValid 
            ? <span style={{'color': 'red'}}>
                {msg ? msg : '양식을 확인해주세요.'}
            </span>
            : <></>
        }
    </>
    )
}

export default ValidInput;