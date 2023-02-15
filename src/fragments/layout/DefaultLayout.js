import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useOutlet } from 'react-router';
import { Container } from '@mui/material';

function DefaultLayout() {
    const outlet = useOutlet();
    return (
        <>
            <Header></Header>
            <Container>
                {outlet}
            </Container>
            <Footer></Footer>
        </>
    );
}

export default DefaultLayout;
