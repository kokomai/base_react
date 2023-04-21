import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        let errorLocation = errorInfo.componentStack.toString().split('(')[0].replace('\n', '').replace('   at ', '')
        if(window.location.host.includes('localhost')) {
            // 로컬이 아닐 경우 에러 수집을 위해 전송
            fetch(
                "/api/error/insert",
                {
                    method: 'POST',
                    headers: {
						"Content-type" : "application/json",
					},
                    body: JSON.stringify({'location' : errorLocation, 'errorText' : error.message})
                }
            );
		} else {
			console.log("errorLocaton : " + errorLocation);
			console.log("errorMsg : " + error.message);
		}
    }

    render() {
        if (this.state.hasError) {
            // fallback UI
            return (
                <>
                    <h3>에러 발생,<br></br> 관리자에게 문의해 주세요.</h3>
                    <button type="button" onClick={()=>{window.location.href="/"}}> 홈으로 </button>
                </>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;