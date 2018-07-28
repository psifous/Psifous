import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';

class Home extends React.Component {

  render() {
    return (
        <div>
          <Layout/>
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