import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {

    let cssclass = ['SideDrawer', 'Close'];
    if (props.open) {
        cssclass = ['SideDrawer', 'Open'];
    }
    return (
        <Auxiliary>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={cssclass.join(' ')} onClick={props.closed}>
                <div style={{ height: '11%', margin: '32px' }}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Auxiliary>

    );
}

export default sideDrawer;