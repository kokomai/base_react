import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Navigate, useOutlet } from 'react-router';
import { setId, setName, selectUser } from '../features/login/userSlice';
import { useSelector } from 'react-redux';

function NeedAuthPages() {
    const user = useSelector(selectUser);
    const outlet = useOutlet();

    let isLogined = false;
    
    if(Object.keys(user).length != 0 && user.id && user.pw) {
        isLogined = true;
    }

    return (
        isLogined
        ?
        <>
            <Header></Header>
            <div className="body someDesignedClass">
                {outlet}
            </div>
            <Footer></Footer>
        </>
        : 
        <>
            <Navigate to="/login" replace></Navigate>
        </>
    );
}

export default NeedAuthPages;
