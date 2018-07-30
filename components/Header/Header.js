import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { componentFromProp } from 'recompose';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';

import { visibleSidebar } from '../../store/actions/ui/uiActions';

class Header extends Component {
  state = {};

  openSidebar = () => {
    this.props.sidebarOpenDispatch();
  };

  goTohome = () => Router.push('/');

  render() {
    const { activeItem } = this.state;
    const { isLogin, userData } = this.props;
    return (
      <Menu stackable>
        <Menu.Item
          name="psifous"
          active={activeItem === 'psifous'}
          onClick={isLogin ? this.openSidebar : this.goTohome}
        >
          <Image src="/static/img/logo.png" size="mini" />
        </Menu.Item>
        {isLogin ? (
          <Menu.Menu position="right">
            <Menu.Item
              name="reviews"
              active={activeItem === 'reviews'}
              onClick={this.handleItemClick}
            >
              <Link href="/login">
                <a>Hai {`${userData.first_name} ${userData.last_name}`}</a>
              </Link>
            </Menu.Item>
          </Menu.Menu>  
        ) : (
          <Menu.Menu position="right">
          <Menu.Item
            name="reviews"
            active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Menu.Item>

          <Menu.Item
            name="upcomingEvents"
            active={activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      )}
      </Menu>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth.isLogin,
    userData: state.auth.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sidebarOpenDispatch: () => dispatch(visibleSidebar())
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Header);
