import { Component } from "react";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        let errorLocation = errorInfo.componentStack.toString().split('(')[0].replace('\n', '').replace('   at ', '')
        // sending error        
        // sendError(errorLocation, error.message);
        console.log(errorLocation);
        console.log(error);
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