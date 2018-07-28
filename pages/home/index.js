import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';

import Layout from '../../components/Layout/Layout';

class Register extends React.Component {

  render() {
    return (
      <Layout>
        <h1>ada di home user</h1>
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(Register);