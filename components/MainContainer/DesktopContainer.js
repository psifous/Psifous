import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Image
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import HomepageHeading from '../Header/HomepageHeading';

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed, isLogin, userData } = this.state

    return (
      <Responsive>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            className="headerBackground"
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Link href="/">
                  <Menu.Item>
                    <Image src="/static/img/logo.png" size="mini" />
                  </Menu.Item>
                </Link>
                {isLogin ? (
                  <Menu.Item position='right'>
                    <Link href="/login">
                       {`${userData.first_name} ${userData.last_name}`}
                    </Link>
                  </Menu.Item>
                ) : (
                  <Menu.Item position='right'>
                    <Link href="/login">
                      <Button as="a" inverted={!fixed}>
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </Link>
                  </Menu.Item>
                )}
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>
        {children}

        <style jsx>{`
          .headerArea {
            min-height: 700px;
            padding: 1em 0em;
          }
          
          .headerBackground {
            background-image: url(/static/img/background.png)
          }
        `}</style>
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    userData: state.auth.userData
  }
}

export default connect(mapStateToProps, null)(DesktopContainer)