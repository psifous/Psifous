import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Header, Grid } from 'semantic-ui-react';
import axios from '@/axios';

import Layout from '../../components/Layout/Layout';
import CommunityCard from '../../components/CommunityCard/CommunityCard';

class HomePage extends React.Component {
  static async getInitialProps(ctx) {
    const { data: info } = await axios.get('/api/users/me', {
      headers: {
        Authorization: ctx.authtoken
      }
    });

    let { id } = info.user;
    const { data } = await axios.get('/api/communities');
    let communities = data.value;

    return { communities, idUser };
  }

  render() {
    const { communities, idUser } = this.props;
    return (
      <Layout>
        <Header as="h2"> The Communities that you follow</Header>
        <Grid columns={1}>
          {this.props.communities.map(community => (
            <Grid.Row key={community.id}>
              <Grid.Column>
                <CommunityCard {...community, idUser} />
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
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
)(HomePage);
