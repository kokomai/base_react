/**
 * fetch + jwt 토큰 관련 함수
 */

import { useDispatch } from "react-redux";
import { setId, setName } from "../features/login/userSlice";
import { hide, show } from "../fragments/loading/loadingSlice";
import { hideTimeoutAlert, showTimeoutAlert } from "../fragments/timeoutAlert/timeoutSlice";

export default function useReq() {
	const dispatch = useDispatch();
	
	// const user = useSelector(selectUser);

	/**
	 *  세션시간.. 프로젝트별로 설정해 주어야 함.
	 *  동작이 없을 시 로그아웃 안내를 위해..
	 */
	const sessionTime = 1000 * 60 * 30; // 일단 30분
	// const sessionTime = 1000 * 15 * 1; // 일단 15초

	/**
	 *  세션 시간이 만료됨을 알려주는 시간
	 */
	const alertTime = 1000 * 60 *  1 // 일단 1분
	// const alertTime = 1000 * 10 * 1 // 일단 10초
	
	/// 세션 / 토큰 유효시간 가져오기
	const getSessionTime = function() {
		return parseInt(sessionStorage.getItem("f-sessionTime"));
	}

	// 세션 / 토큰 유효시간 설정하기
	const setSessionTime = function(time = sessionTime) {
		sessionStorage.setItem("f-sessionTime", time);
	}

	const setSessionCheck = function() {
		clearInterval(window["sessionInterval"]);
		window["sessionInterval"] = setInterval(()=> {
			let nowCount = getSessionTime();
			if(nowCount <= alertTime) {
				if(nowCount <= 0) {
					// 완전 만료시 로그아웃
					logout();
					return;
				} else {
					// toggle 형식으로 타임아웃 안내 보여주기.
					// 해당 안내 컴포넌트는 App.js에 정의
					dispatch(showTimeoutAlert());
				}

				setSessionTime(nowCount - 1000);
			} else {
				setSessionTime(nowCount - 1000);
			}
		}, 1000)
	}

    // access token 가져오기
    const getAToken = function() {
		// using sessionStorage
        return sessionStorage.getItem("aToken");

		// usign redux
		// return user.aToken;
    }
    // access token 셋팅
    const setAToken = function(token) {
		// using sessionStorage
        sessionStorage.setItem("aToken", token);

		// usign redux
		// dispatch(setA(token));
    }
    // access token 삭제
    const delAToken = function() {
		// using sessionStorage
        sessionStorage.removeItem("aToken");
		// dispatch(setA(''));
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
        return sessionStorage.getItem("rToken");

		// usign redux
		// return user.rToken;
    }
    // refresh token 셋팅
    const setRToken = function(token) {
		// using sessionStorage
        sessionStorage.setItem("rToken", token);

		// usign redux
		// dispatch(setR(token));
    }
    // refresh token 삭제
    const delRToken = function() {
		// using sessionStorage
        sessionStorage.removeItem("rToken");
		// dispatch(setR(''));
    }
    // refresh token 헤더값 설정
    // const rTokenHeader = function(xhr) {
    //     let rToken = getRToken();
    //     xhr.setRequestHeader("Content-type","application/json");
    //     xhr.setRequestHeader("Authorization","JWT " + rToken);
    // }
    // get request
	/**
	**	options = {
	*		url = 요청 url
	*		params = 전달할 파라미터 ({})
	*		success = 성공시 호출할 콜백 함수
	*		error = 에러시 호출할 콜백 함수
	*		noLoading = true
	*			-> true 설정시, Loading 없이 호출
	*		keepLoading = true 
	*			-> 여러번 비동기로 호출 시 앞서 호출한 요청이 Loading을 가리지 않게 하기 
	*	}
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
			if(res.headers.get("X-AUTH-ATOKEN")) {
				setAToken(res.headers.get("X-AUTH-ATOKEN"));
			}

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
				// 세션 시간 초기화
				setSessionTime();
				setSessionCheck();
				successF(data);
			} else {
				if(!url.includes('login')) {
					// don't recording error when login or login timeout
					if(typeof data === 'object') {
						sendError(url, data.message);
					} else {
						sendError(url, data);
					}
				}
				errorF(data);
			}
				
			if(isHideLoading) {
				setTimeout(()=> {
					dispatch(hide());
				}, 100)
			}
		}).catch(err =>{
			// console.error(err);
			sendError(url, err);
			errorF(err);

			if(isHideLoading) {
				setTimeout(()=> {
					dispatch(hide());
				}, 100)
			}
		});
    }

	/// post request
	/**
	**	options = {
	*		url = 요청 url
	*		params = 전달할 파라미터 ({})
	*		success = 성공시 호출할 콜백 함수
	*		error = 에러시 호출할 콜백 함수
	*		noLoading = true
	*			-> true 설정시, Loading 없이 호출
	*		keepLoading = true 
	*			-> 여러번 비동기로 호출 시 앞서 호출한 요청이 Loading을 가리지 않게 하기 
	*	}
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
			if(res.headers.get("X-AUTH-ATOKEN")) {
				setAToken(res.headers.get("X-AUTH-ATOKEN"));
			}
			
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
				// 세션 시간 초기화
				setSessionTime();
				setSessionCheck();
				successF(data);
			} else {
				if(!url.includes('login')) {
					// don't recording error when login or login timeout
					if(typeof data === 'object') {
						sendError(url, data.message);
					} else {
						sendError(url, data);
					}
				}

				errorF(data);
			}
				
			if(isHideLoading) {
				setTimeout(()=> {
					dispatch(hide());
				}, 100)
			}
		}).catch(err =>{
			// console.error(err);
			sendError(url, err);

			errorF(err);

			if(isHideLoading) {
				setTimeout(()=> {
					dispatch(hide());
				}, 100)
			}
		});
    }

	/// file request
	/**
	**	options = {
	*		url = 요청 url
	*		params = 전달할 파라미터 ({})
	*		files = 전달할 파일 array 객체()
	*		success = 성공시 호출할 콜백 함수
	*		error = 에러시 호출할 콜백 함수
	*		noLoading = true
	*			-> true 설정시, Loading 없이 호출
	*		keepLoading = true 
	*			-> 여러번 비동기로 호출 시 앞서 호출한 요청이 Loading을 가리지 않게 하기 
	*	}
	*/
    const file = function(options) {
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
		let files = [];
		let formData = new FormData();

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

			if(options.files !== undefined || options.files !== null) {
				if(!Array.isArray(files)){
					// 파일 리스트 오브젝트 형태 그대로일 경우 Array로 변환
					files = Array.from(options.files);
				} else {
					files = options.files;
				}
			}
		}
		
		if(isLoading) {
			dispatch(show());
		}
		
		let isSuccess = true;

		for (const file of files) {
			formData.append('files', file, file.name);
		}

		formData.append('params', JSON.stringify(params));
        
		return fetch(
			url,
			{
				method: 'POST',
				headers: {
					"X-AUTH-ATOKEN" : getAToken(),
					"X-AUTH-RTOKEN" : getRToken()
				},
				body: formData
			}
		).then((res) => {
			if(res.headers.get("X-AUTH-ATOKEN")) {
				setAToken(res.headers.get("X-AUTH-ATOKEN"));
			}
			
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
				// 세션 시간 초기화
				setSessionTime();
				setSessionCheck();
				successF(data);
			} else {
				if(!url.includes('login')) {
					// don't recording error when login or login timeout
					if(typeof data === 'object') {
						sendError(url, data.message);
					} else {
						sendError(url, data);
					}
				}

				errorF(data);
			}
				
			if(isHideLoading) {
				setTimeout(()=> {
					dispatch(hide());
				}, 100)
			}
		}).catch(err =>{
			// console.error(err);
			sendError(url, err);

			errorF(err);

			if(isHideLoading) {
				setTimeout(()=> {
					dispatch(hide());
				}, 100)
			}
		});
    }


	const sendError = (errorLocation, errorMsg) => {
		// sending error
		if(window.location.host.includes('localhost')) {
			fetch(
                "/api/error/insert",
                {
                    method: 'POST',
					headers: {
						"Content-type" : "application/json",
					},
                    body: JSON.stringify({'location' : errorLocation, 'errorText' : errorMsg})
                }
            );
		} else {
			console.log("errorLocaton : " + errorLocation);
			console.log("errorMsg : " + errorMsg);
		}
	}

	const logout = () => {
		delAToken();
		delRToken();
		dispatch(setId(''));
		dispatch(setName(''));
        sessionStorage.removeItem("f-sessionTime");
		clearInterval(window["sessionInterval"]);
		dispatch(hideTimeoutAlert());
		window.location.href = '/login';
	}

	return {
		get:get, post:post, file:file,
		getAToken:getAToken, setAToken:setAToken, delAToken:delAToken, 
		getRToken:getRToken, setRToken:setRToken, delRToken:delRToken,
		sendError:sendError,
		setSessionCheck: setSessionCheck, getSessionTime:getSessionTime, 
		setSessionTime:setSessionTime, sessionTime:sessionTime, alertTime:alertTime,
		logout:logout,
	}
}