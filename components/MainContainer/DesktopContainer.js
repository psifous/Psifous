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

import HomepageHeading from '../Header/HomepageHeading';

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
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
                <Menu.Item>
                  <Image src="/static/img/logo.png" size="mini" />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button inverted={!fixed}>
                    Log in
                  </Button>
                  <Button inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>
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
    
  }
}

export default connect(mapStateToProps, null)(DesktopContainer)