/**
 * 공용 popup 호출 함수(alert, confirm, popup)
 */

import { useDispatch } from "react-redux";
import { showAlert, showConfirm, setText, setTitle, setAlertBtnText, setConfirmBtnText, setCancelBtnText, setOnCancel, setOnConfirm, hideAlert, hideConfirm} from "../fragments/popup/popupSlice";

export default function usePopup() {
	const dispatch = useDispatch();
	/**
    **	options = {
	*       title = 제목
	*       text = 내용
	*       btn = 버튼 텍스트
    *       onConfirm = 확인 버튼 누를 시 실행할 함수(function 기입)
	*	}
	*/
	const alert = (options) => {
        dispatch(setAlertBtnText(""));
        dispatch(setText(""));
        dispatch(setTitle(""));
        dispatch(setOnConfirm(function() {}));
        dispatch(setOnCancel(function() {}));

        if (!options.title) {
            dispatch(setTitle("안내"));
        } else {
            dispatch(setTitle(options.title));
        }

        if (!options.btn) {
            dispatch(setAlertBtnText("확인"));
        } else {
            dispatch(setAlertBtnText(options.btn));
        }
        
        if(typeof options.onConfirm === "function") {
            dispatch(setOnConfirm(options.onConfirm));
        }

        if(options.text) {
            dispatch(setText(options.text));
        }

        dispatch(showAlert());
    }
    /**
    **	options = {
	*       title = 제목
	*       text = 내용
	*       confirmBtn = 확인 버튼 텍스트
    *       cancelBtn = 취소 버튼 텍스트
    *       onConfirm = confirm시 실행할 함수(function 기입)
    *       onCancel = cancel시 실행할 함수
	*	}
	*/
	const confirm = (options) => {
        dispatch(setConfirmBtnText(""));
        dispatch(setConfirmBtnText(""));
        dispatch(setText(""));
        dispatch(setTitle(""));
        dispatch(setOnConfirm(function() {}));
        dispatch(setOnCancel(function() {}));

        if (!options.title) {
            dispatch(setTitle("확인"));
        } else {
            dispatch(setTitle(options.title));
        }

        if (!options.confirmBtn) {
            dispatch(setConfirmBtnText("확인"));
        } else {
            dispatch(setConfirmBtnText(options.confirmBtn));
        }

        if (!options.cancelBtn) {
            dispatch(setCancelBtnText("취소"));
        } else {
            dispatch(setCancelBtnText(options.cancelBtn));
        }

        if(options.text) {
            dispatch(setText(options.text));
        }

        if(options.onConfirm) {
            dispatch(setOnConfirm(options.onConfirm));
        }

        if(options.onCancel) {
            dispatch(setOnCancel(options.onCancel));
        }

        dispatch(showConfirm());
    }

	return {
		alert, confirm
	}
}