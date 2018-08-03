import React, { Component } from 'react';
import { Container, Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Header from '@/components/Header/Header.js';
import SidebarComponent from '@/components/Sidebar/Sidebar';

class Layout extends Component {
  render() {
    const { visible } = this.props;
    return (
      <div>
        <div className="layout">
          <div style={{ minHeight: '100vh' }}>
            <Sidebar.Pushable style={{ height: '100vh' }}>
              <SidebarComponent />
              <Sidebar.Pusher dimmed={visible}>
                <Header />
                <Container>
                  <div className="main">{this.props.children}</div>
                </Container>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </div>
        <style jsx>
          {`
            .layout {
              min-height: 100vh;
              background-color: #009688;
            }

            .main {
              padding-bottom: 16px;
            }

            .pushable {
              height: 100vh !important;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.ui.visible
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
