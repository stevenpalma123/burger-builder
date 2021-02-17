import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => {
    // console.log('spiner')
    return(
        <div className={classes.Loader}>Loading...</div>
    );
}

export default spinner;