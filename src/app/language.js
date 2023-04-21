/**
 * Language 번역 관련 함수
 */

const LANG = {
	ko : {
		/**
		 *  c : 공통
		 */
		"c001" : "확인",
		"c002" : "취소",
		"c003" : "안내",
		/**
		 *  m : 메뉴
		 */
		"m001" : "홈",
		"m002" : "정보",
		"m003" : "마이페이지",
		"m004" : "샘플",
		/**
		 *  l : 로그인, 회원
		 */
		"l001" : "로그인",
		"l002" : "아이디",
		"l003" : "비밀번호",
		"l004" : "자동로그인",
		"l005" : "필수값을 채워주세요.",
		"l006" : "아이디 혹은 비밀번호를 확인해 주세요!",
		"l007" : "개인 PC에서만 체크해주세요.",
		"l008" : "로그아웃",
	},
	en : {
		/**
		 *  c : 공통
		 */
		// 확인
		"c001" : "Confirm",
		// 취소
		"c002" : "Cancel",
		// alert, confrim 제목
		"c003" : "Notice",
		/**
		 *  m : 메뉴
		 */
		"m001" : "Home",
		"m002" : "Info",
		"m003" : "MyPage",
		"m004" : "Sample",
		/**
		 *  l : 로그인, 회원
		 */
		"l001" : "Login",
		"l002" : "ID",
		"l003" : "Password",
		"l004" : "AutoLogin",
		"l005" : "Please enter your ID and Password.",
		"l006" : "Check your ID or Password!",
		"l007" : "Please check this at your personal computer",
		"l008" : "Logout",
	},

	/**
	 *  @param : (localStorage에 저장된 언어코드, 불러오려는 텍스트 코드)
	 * 
	 */
	get : (code) => {
		let lang = localStorage.getItem("Flang");
		if(LANG[lang] && LANG[lang][code]) {
			return LANG[lang][code];
		}

		return "";
	}
}

export default LANG;