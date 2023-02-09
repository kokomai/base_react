import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useOutlet } from 'react-router';

function HeadlessLayout() {
    const outlet = useOutlet();
    return (
        <>
            <div className="body someDesignedClass">
                {outlet}
            </div>
            <Footer></Footer>
        </>
    );
}

export default HeadlessLayout;
