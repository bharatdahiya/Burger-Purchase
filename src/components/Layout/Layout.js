import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import * as actionType from '../../store/actions/index';
import { connect } from 'react-redux';

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
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    open={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDraw}
                    closed={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
export default connect(mapStateToProps)(Layout);