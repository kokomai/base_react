/**
 * fetch + jwt 토큰 관련 함수
 * @author : coding-orca
 * All copyright reserved by https=//github.com/kokomai
 */

import { useDispatch } from "react-redux";
import { show, hide } from "../fragments/loading/loadingSlice";

export default function useReq() {
	const dispatch = useDispatch();

    // refresh token 가져오기(sessionStorage)
    const getRToken = function() {
        return sessionStorage.getItem("rToken");
    }
    // refresh token 셋팅(sessionStorage)
    const setRToken = function(tokn) {
        sessionStorage.setItem("rToken", tokn);
    }
    // refresh token 삭제(sessionStorage)
    const delRToken = function() {
        sessionStorage.removeItem("rToken");
    }
    // access token 가져오기(sessionStorage)
    const getAToken = function() {
        return sessionStorage.getItem("aToken");
    }
    // access token 셋팅(sessionStorage)
    const setAToken = function(tokn) {
        sessionStorage.setItem("aToken", tokn);
    }
    // access token 삭제(sessionStorage)
    const delAToken = function() {
        sessionStorage.removeItem("aToken");
    }
    // access token 헤더값 설정
    const aTokenHeader = function(xhr) {
        let aToken = getAToken();
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader("Authorization","JWT " + aToken);
    }
    // access token 만료시 refresh token 헤더값 설정
    const rTokenHeader = function(xhr) {
        let rToken = getRToken();
        let aToken = getAToken();
		
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader("X-AUTH-RTOKEN", rToken);
        xhr.setRequestHeader("X-AUTH-ATOKEN", aToken);
    }
    // get request
	/*
		options = {
			url = 요청 url
			params = 전달할 파라미터 ({})
			success = 성공시 호출할 콜백 함수
			error = 에러시 호출할 콜백 함수
			noLoading = true
				-> true 설정시, Loading 없이 호출
			keepLoading = true 
				-> 여러번 비동기로 호출 시 앞서 호출한 요청이 Loading을 가리지 않게 하기 
		}
	*/
    const get = function(options) {
		let url = "";
		let params = {};
		let successF = function(res) {
			console.log(res);
		};
		let errorF = function(res) {
			console.error(res);
		};
		let isLoading = true;
		let isHideLoading = true;
		
		if(typeof options === "object") {
			if(options.url) {
				url = options.url
			}
			if(options.params) {
				params = options.params
			}
			if(options.success) {
				successF = options.success
			}
			if(options.error) {
				errorF = options.error
			}
			if(options.noLoading != undefined || options.noLoading != null) {
				isLoading = !options.noLoading
			}
			if(options.keepLoading != undefined || options.keepLoading != null) {
				isHideLoading = !options.keepLoading
			}
		}
		
		if(isLoading) {
			dispatch(show());
		}

		let paramsKeys = Object.keys(params);

		for(let key of paramsKeys) {
			if(!url.includes('?')) {
				url = url + '?' + key + '=' +params[key];
			} else {
				url = url + '&' + key + '=' + params[key];
			}
		}
		
		let isSuccess = true;
        
		return fetch(
			url,
			{
				method: 'GET',
				headers: {
					"Content-type" : "application/json",
					"X-AUTH-RTOKEN" : getRToken(),
					"X-AUTH-ATOKEN" : getAToken()
				},
			}
		).then((res) => {
			setAToken(res.headers.get("X-AUTH-ATOKEN"));
			if(!res.ok) {
				isSuccess = false;
			}
			
			return res.json();
		}).then(data => {
			if(isSuccess) {
				successF(data);
			} else {
				errorF(data);
			}
				
			if(isHideLoading) {
				dispatch(hide());
			}
		}).catch(err =>{
			console.error(err);
			errorF(err);

			if(isHideLoading) {
				dispatch(hide());
			}
		});
    }

	// post request
	/*
		options = {
			url = 요청 url
			params = 전달할 파라미터 ({})
			success = 성공시 호출할 콜백 함수
			error = 에러시 호출할 콜백 함수
			noLoading = true
				-> true 설정시, Loading 없이 호출
			keepLoading = true 
				-> 여러번 비동기로 호출 시 앞서 호출한 요청이 Loading을 가리지 않게 하기 
		}
	*/
    const post = function(options) {
		let url = "";
		let params = {};
		let successF = function(res) {
			console.log(res);
		};
		let errorF = function(res) {
			console.error(res);
		};
		let isLoading = true;
		let isHideLoading = true;
		
		if(typeof options === "object") {
			if(options.url) {
				url = options.url
			}
			if(options.params) {
				params = options.params
			}
			if(options.success) {
				successF = options.success
			}
			if(options.error) {
				errorF = options.error
			}
			if(options.noLoading != undefined || options.noLoading != null) {
				isLoading = !options.noLoading
			}
			if(options.keepLoading != undefined || options.keepLoading != null) {
				isHideLoading = !options.keepLoading
			}
		}
		
		if(isLoading) {
			dispatch(show());
		}
		
		let isSuccess = true;
        
		return fetch(
			url,
			{
				method: 'POST',
				headers: {
					"Content-type" : "application/json",
					"X-AUTH-RTOKEN" : getRToken(),
					"X-AUTH-ATOKEN" : getAToken()
				},
				body: JSON.stringify(params)
			}
		).then((res) => {
			setAToken(res.headers.get("X-AUTH-ATOKEN"));
			if(!res.ok) {
				isSuccess = false;
			}
			
			return res.json();
		}).then(data => {
			if(isSuccess) {
				successF(data);
			} else {
				errorF(data);
			}
				
			if(isHideLoading) {
				dispatch(hide());
			}
		}).catch(err =>{
			console.error(err);
			errorF(err);

			if(isHideLoading) {
				dispatch(hide());
			}
		});
    }

	return {get:get, post:post}
}