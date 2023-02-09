import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from './loadingSlice';


function Loading() {
    const loading = useSelector(selectLoading);
    return (
        loading 
        ?
            <div className='loading'>
                now Loading...
            </div>
        : 
            <></>
    );
}

export default Loading;
