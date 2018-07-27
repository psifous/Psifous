import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {

  render() {
    return (
        <div>
          <h1>Index {JSON.stringify(this.props)}</h1>
        </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(Home);