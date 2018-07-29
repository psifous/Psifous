import React, { Component } from 'react';
import { Menu, Sidebar, Icon } from 'semantic-ui-react';
import { componentFromProp } from 'recompose';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';

import { hiddenSidebar } from '../../store/actions/ui/uiActions';

class SidebarComponent extends Component {
  closeSidebar = () => {
    this.props.sidebarCloseDispatch();
  };

  onLogout = () => {
    document.cookie =
      'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    Router.push('/login');
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
        <Menu.Item as="a">
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={this.onLogout}>
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
    sidebarCloseDispatch: () => dispatch(hiddenSidebar())
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(SidebarComponent);
