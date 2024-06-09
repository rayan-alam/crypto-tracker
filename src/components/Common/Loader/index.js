import React from 'react';
import { CircularProgress } from '@mui/material';
import './styles.css';

function Loader(){
    return(
        <div className='loader-component'>
            <CircularProgress></CircularProgress>
        </div>
    )
}

export default Loader;