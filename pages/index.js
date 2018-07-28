import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';
import MainPage from '../components/Main/Main'

class Home extends React.Component {

  render() {
    return (
      <Layout>
        <MainPage />
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(Home);