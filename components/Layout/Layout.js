import React, { Component } from 'react';
import Head from 'next/head';
import { Container, Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Header from '../Header/Header.js';
import SidebarComponent from '../Sidebar/Sidebar';

class Layout extends Component {
  render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        <div className="layout">
          <Head>
            <link
              rel="stylesheet"
              href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
            />
          </Head>
          <div style={{ minHeight: '100vh' }}>
            <Sidebar.Pushable style={{ height: '100vh' }}>
              <SidebarComponent />
              <Sidebar.Pusher dimmed={visible}>
                <Header />
                <Container className="main">{this.props.children}</Container>
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
