import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => {
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} style={{height: props.height}} alt="burger logo" />
        </div>
    );
}

export default logo;