import React, { Component } from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react';
import { Link, Router } from './../../routes';
import { connect } from 'react-redux';

import { hiddenSidebar } from '../../store/actions/ui/uiActions';
import { logoutAction } from '../../store/actions/auth/authActions';

class SidebarComponent extends Component {
  closeSidebar = () => {
    this.props.sidebarCloseDispatch();
  };

  onLogout = () => {
    // document.cookie =
    //   'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Router.push('/login');
    this.props.onLogout();
  };

  onItemClick = name => {
    this.props.sidebarCloseDispatch();
    switch (name) {
      case 'logout':
        this.props.onLogout();
    }
  };

  render() {
    const { isLogin, visible } = this.props;
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        onHide={this.closeSidebar}
        vertical
        visible={visible}
        width="thin"
      >
        <Link href="/dashboard">
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
        </Link>
        <Menu.Item as="a" onClick={() => this.onItemClick('logout')}>
          <Icon name="sign out alternate" />
          Logout
        </Menu.Item>
      </Sidebar>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth.isLogin,
    visible: state.ui.visible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sidebarCloseDispatch: () => dispatch(hiddenSidebar()),
    onLogout: () => dispatch(logoutAction())
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(SidebarComponent);
