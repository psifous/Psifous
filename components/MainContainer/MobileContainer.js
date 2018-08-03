import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Link from 'next/link';

import HomepageHeading from '../Header/HomepageHeading';

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened, isLogin, userData } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item active>
              <Link href="/">
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/register">
              <a>register</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/login">
              <a>login</a>
              </Link>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    {/* <Icon name='sidebar' /> */}
                    <Image src="/static/img/logo.png" size="mini" />
                  </Menu.Item>
                  {isLogin ? (
                    <Menu.Item position='right'>
                    <Link href="/login">
                      <Button as='a' inverted>
                      {`${userData.first_name} ${userData.last_name}`}
                      </Button>
                    </Link>
                  </Menu.Item>
                  ) : (
                    <Menu.Item position='right'>
                      <Link href="/login">
                        <Button as='a' inverted>
                          Log in
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                          Sign Up
                        </Button>
                      </Link>
                    </Menu.Item>
                  )}
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    userData: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(MobileContainer)
