import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import axios from '@/axios';

import Layout from '@/components/Layout/Layout';
import VoteCard from '@/components/VoteCard/VoteCard';

class ElectionPage extends React.Component {
  static async getInitialProps(ctx) {
    const { data: info } = await axios.get(
      '/api/users/me',
      {
        headers: {
          Authorization: ctx.authtoken
        }
      }
    );

    const { electionid } = ctx.query;
    const { data } = await axios.get(
      `/api/elections/${electionid}`
    );
    const election = data.value;

    return { election };
  }

  render() {
    return (
      <Layout>
        <VoteCard {...this.props.election} />
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