import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react'


class Main extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Container fluid>
          <h1>Vote securely, transparent, and easy</h1>
        </Container>

        <style jsx>
          {`
            h1, a {
              color: teal;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(Main);