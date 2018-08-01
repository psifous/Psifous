import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

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
        <Head>
          <title>Psifous | Home</title>
        </Head>
        <MainPage />
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  };
};
export default connect(
  mapStateToprops,
  null
)(Home);
