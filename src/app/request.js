/**
 * fetch + jwt 토큰 관련 함수
 * @author : coding-orca
 * All copyright reserved by https=//github.com/kokomai
 */

import { useDispatch, useSelector } from "react-redux";
import { selectUser, setA, setR } from "../features/login/userSlice";
import { show, hide } from "../fragments/loading/loadingSlice";

export default function useReq() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

    // access token 가져오기
    const getAToken = function() {
		// using sessionStorage
        // return sessionStorage.getItem("aToken");

		// usign redux
		return user.aToken;
    }
    // access token 셋팅
    const setAToken = function(token) {
		// using sessionStorage
        // sessionStorage.setItem("aToken", token);

		// usign redux
		dispatch(setA(token));
    }
    // access token 삭제
    const delAToken = function() {
		// using sessionStorage
        // sessionStorage.removeItem("aToken");
		dispatch(setA(''));
    }
    // access token 헤더값 설정
    // const aTokenHeader = function(xhr) {
    //     let aToken = getAToken();
    //     xhr.setRequestHeader("Content-type","application/json");
    //     xhr.setRequestHeader("Authorization","JWT " + aToken);
    // }

    // refresh token 가져오기
    const getRToken = function() {
		// using sessionStorage
        // return sessionStorage.getItem("aToken");

		// usign redux
		return user.rToken;
    }
    // refresh token 셋팅
    const setRToken = function(token) {
		// using sessionStorage
        // sessionStorage.setItem("aToken", token);

		// usign redux
		dispatch(setR(token));
    }
    // refresh token 삭제
    const delRToken = function() {
		// using sessionStorage
        // sessionStorage.removeItem("aToken");
		dispatch(setR(''));
    }
    // refresh token 헤더값 설정
    // const rTokenHeader = function(xhr) {
    //     let rToken = getRToken();
    //     xhr.setRequestHeader("Content-type","application/json");
    //     xhr.setRequestHeader("Authorization","JWT " + rToken);
    // }
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
				successF = function(data) {
					try{
						options.success(data);
					} catch(e) {
						sendError(url, e.message);
					}
				}
			}
			if(options.error) {
				errorF = options.error
			}
			if(options.noLoading !== undefined || options.noLoading !== null) {
				isLoading = !options.noLoading
			}
			if(options.keepLoading !== undefined || options.keepLoading !== null) {
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
					"X-AUTH-ATOKEN" : getAToken(),
					"X-AUTH-RTOKEN" : getRToken()
				},
			}
		).then((res) => {
			setAToken(res.headers.get("X-AUTH-ATOKEN"));
			if(!res.ok) {
				isSuccess = false;
			}
			
			if(res.headers.get("content-type") === 'application/json') {
				return res.json();
			} else  {
				return res.text();
			}
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
				successF = function(data) {
					try{
						options.success(data);
					} catch(e) {
						sendError(url, e.message);
					}
				}
			}
			if(options.error) {
				errorF = options.error
			}
			if(options.noLoading !== undefined || options.noLoading !== null) {
				isLoading = !options.noLoading
			}
			if(options.keepLoading !== undefined || options.keepLoading !== null) {
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
					"X-AUTH-ATOKEN" : getAToken(),
					"X-AUTH-RTOKEN" : getRToken()
				},
				body: JSON.stringify(params)
			}
		).then((res) => {
			setAToken(res.headers.get("X-AUTH-ATOKEN"));
			if(!res.ok) {
				isSuccess = false;
			}
			
			if(res.headers.get("content-type") === 'application/json') {
				return res.json();
			} else  {
				return res.text();
			}
		}).then(data => {
			if(isSuccess) {
				successF(data);
			} else {
				if(typeof data === 'object') {
					sendError(url, data.message);
				} else {
					sendError(url, data);
				}

				errorF(data);
			}
				
			if(isHideLoading) {
				dispatch(hide());
			}
		}).catch(err =>{
			// console.error(err);
			sendError(url, err);

			errorF(err);

			if(isHideLoading) {
				dispatch(hide());
			}
		});
    }

	const sendError = (errorLocation, errorMsg) => {
		// sending error

		console.log("errorLocaton : " + errorLocation);
		console.log("errorMsg : " + errorMsg);
	}

	return {
		get:get, post:post,
		getAToken:getAToken, setAToken:setAToken, delAToken:delAToken, 
		getRToken:getRToken, setRToken:setRToken, delRToken:delRToken,
		sendError:sendError
	}
}