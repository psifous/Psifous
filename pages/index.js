import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/MainContainer';
import MainPage from '../components/Main/MainPage';

class Home extends React.Component {

  static async getInitialProps(ctx) {

    const queryParams = ctx.query;

    return { queryParams };
  }

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