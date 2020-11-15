import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {

    state = {
        showSideDraw: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDraw: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDraw: !prevState.showSideDraw } });
    }
    render() {
        return (
            <Auxiliary>
                <Toolbar open={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDraw} closed={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;