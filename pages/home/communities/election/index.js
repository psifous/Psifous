import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';

import Layout from '../../../../components/Layout/Layout';
import ElectionDetail from '../../../../components/ElectionDetail/ElectionDetail'

class ElectionPage extends React.Component {

  render() {
    return (
      <Layout>
        <ElectionDetail/>
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(ElectionPage);