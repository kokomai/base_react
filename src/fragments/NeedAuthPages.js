import React, { useEffect, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router';
import useReq from '../app/request';
import { COMM } from '../app/common';


function NeedAuthPages() {
    const outlet = useOutlet();
    
    const req = useReq();
    const [isLogined, setIsLogined] = useState(false);
    const nav = useNavigate();

    const aToken = req.getAToken();

    useEffect(() => {
        if(COMM.isNotEmpty(aToken)) {
            req.post({
                url: '/api/login/checkLogin',
                success: function(data) {
                    setIsLogined(true);
                },
                error: function() {
                    setIsLogined(false);
                    sessionStorage.setItem("afterLogin", outlet.props.children.props.match.pathname);
                    nav("/login");
                }
            })
        } else {
            setIsLogined(false);
            nav("/login")
        }
    }, [])

    return (
        isLogined
        ?
        <>
            {outlet}
        </>
        : 
        <>
        </>
    );
}

export default NeedAuthPages;
