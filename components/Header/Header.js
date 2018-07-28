import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { componentFromProp } from 'recompose';

export default class Header extends Component {
  state = {};

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item
          name="editorials"
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        >
          <Image src="/static/img/logo.png" size="mini" />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            name="reviews"
            active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          >
            Login
          </Menu.Item>

          <Menu.Item
            name="upcomingEvents"
            active={activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
          >
            Register
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
