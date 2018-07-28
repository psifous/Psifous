import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'


class Main extends React.Component {

  render() {
    return (
      <Container Fluid>
        <h1>Test</h1>
      </Container>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(Main);