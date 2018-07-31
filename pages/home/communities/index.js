import React, { Component } from 'react';
import { Grid, Button, Header, Segment } from 'semantic-ui-react';
import axios from '@/axios';
import { connect } from 'react-redux';

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
    const showJoinButton = !community.Users.some(
      user => user.id === this.props.userData.id
    );

    return (
      <Layout>
        <Grid stackable columns={1}>
          <Grid.Column>
            <Header as="h2" inverted floated="left">
              {community.name}
            </Header>
            {showJoinButton ? (
              <Button
                id="join"
                floated="right"
                icon="group"
                primary
                content="Join"
                onClick={this.onJoinCommunity}
              />
            ) : null}
          </Grid.Column>
          <Grid.Column>
            <Grid columns={1}>
              {community.Elections.map(election => (
                <Grid.Row key={election.id}>
                  <Grid.Column>
                    <ElectionUserCard {...election} />
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData
  };
};

export default connect(
  mapStateToProps,
  null
)(CommunityPage);
