import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <header className={classes.Toolbar}>
                <DrawerToggle  click={props.opened}/>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </header>
        </Aux>
        
    );
}

export default toolbar;