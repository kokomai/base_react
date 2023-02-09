import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className='header'>
            <Link to="/">
                <button> MAIN </button>
            </Link>
            <Link to="/about">
                <button> ABOUT </button>
            </Link>
            <Link to="/mypage">
                <button> MYPAGE </button>
            </Link>
            <Link to="/login">
                <button> LOGIN </button>
            </Link>
            
        </div>
    );
}

export default Header;
