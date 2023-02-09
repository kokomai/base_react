import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useOutlet } from 'react-router';

function DefaultLayout() {
    const outlet = useOutlet();
    return (
        <>
            <Header></Header>
            <div className="body someDesignedClass">
                {outlet}
            </div>
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
