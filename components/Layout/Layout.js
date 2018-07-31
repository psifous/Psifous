import React, { Component } from 'react';
import { Container, Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Header from '@/components/Header/Header.js';
import SidebarComponent from '@/components/Sidebar/Sidebar';

class Layout extends Component {
  render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        <div className="layout">
          <div style={{ minHeight: '100vh' }}>
            <Sidebar.Pushable style={{ height: '100vh' }}>
              <SidebarComponent />
              <Sidebar.Pusher dimmed={visible}>
                <Header />
                <Container className="main">
                  {this.props.children}
                </Container>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </div>
        <style jsx>
          {`
            .layout {
              min-height: 100vh;
            }

            .pushable {
              height: 100vh !important;
            }
          `}
        </style>
      </React.Fragment>
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
