import React from 'react';
import { connect } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react';
import axios from '@/axios';

import Layout from '@/components/Layout/Layout';
import CommunityCard from '@/components/CommunityCard/CommunityCard';

class HomePage extends React.Component {
  static async getInitialProps(ctx) {
    const { data } = await axios.get('/api/communities');
    let communities = data.value;

    return { communities };
  }

  render() {
    return (
      <Layout>
        <Header as="h2">Explore Communities</Header>
        <Grid columns={1}>
          {this.props.communities.map(community => (
            <Grid.Row key={community.id}>
              <Grid.Column>
                <CommunityCard {...community} />
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
    isLogin: state.auth.isLogin,
    userData: state.auth.userData
  };
};
export default connect(
  mapStateToprops,
  null
)(HomePage);
