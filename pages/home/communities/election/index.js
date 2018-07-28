import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';

import Layout from '../../../../components/Layout/Layout';
import VotePage from '../../../../components/VotePage/VotePage'

class ElectionPage extends React.Component {

  render() {
    return (
      <Layout>
        <VotePage/>
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