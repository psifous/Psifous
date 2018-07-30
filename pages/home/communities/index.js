import React, { Component } from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';
import Link from 'next/link';
import axios from '@/axios';

import Layout from '@/components/Layout/Layout';
import ElectionUserCard from '@/components/ElectionUserCard/ElectionUserCard';

class CommunityPage extends Component {
  static async getInitialProps(ctx) {
    let communityid = ctx.query.communityid;
    let { data } = await axios.get(`/api/communities/${communityid}`);
    let community = data.value;
    return { community };
  }

  render() {
    let { community } = this.props;
    return (
      <Layout>
        <Header as="h2">New Elections</Header>
        <Grid columns={1}>
          {community.Elections.map(election => (
            <Grid.Row key={election.id}>
              <Grid.Column>
                <ElectionUserCard {...election} />
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      </Layout>
    );
  }
}

export default CommunityPage;
