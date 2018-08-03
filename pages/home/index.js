import React from 'react';
import { connect } from 'react-redux';
import { Header, Grid, GridColumn, Search } from 'semantic-ui-react';
import axios from '@/axios';

import Layout from '@/components/Layout/Layout';
import CommunityCard from '@/components/CommunityCard/CommunityCard';
import FeedAccordion from '@/components/FeedAccordion/FeedAccordion';

class HomePage extends React.Component {
  static async getInitialProps(ctx) {
    const { data } = await axios.get('/api/communities');
    let communities = data.value;

    return { communities };
  }

  render() {
    return (
      <Layout>
        <Header as="h2" inverted>
          Explore Communities
        </Header>
        <Grid columns={2} stackable>
          <Grid.Column width={4}>
            <FeedAccordion />
          </Grid.Column>
          <Grid.Column width={11}>
            <Grid.Row>
              <Grid columns={1}>
                <Grid.Column>
                  <Search fluid />
                </Grid.Column>
                {this.props.communities.map(community => (
                  <Grid.Column key={community.id}>
                    <CommunityCard {...community} />
                  </Grid.Column>
                ))}
              </Grid>
            </Grid.Row>
          </Grid.Column>
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
