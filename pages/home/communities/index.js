import React, { Component } from 'react';
import {
  Grid,
  Button,
  Header,
  Segment,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import axios from '@/axios';
import { connect } from 'react-redux';
import { Router } from '@/routes';
import Layout from '@/components/Layout/Layout';
import ElectionUserCard from '@/components/ElectionUserCard/ElectionUserCard';
import {
  openConfirmation,
  closeConfirmation
} from '@/store/actions/ui/uiActions';
import ConfirmationDialog from '@/components/ConfirmationDialog/ConfirmationDialog';

class CommunityPage extends Component {
  static async getInitialProps(ctx) {
    let communityid = ctx.query.communityid;
    let { data } = await axios.get(`/api/communities/${communityid}`);
    let community = data.value;
    return { community };
  }

  state = {
    isLoading: false
  };

  onJoinCommunity = async () => {
    this.props.openConfirmation();
  };

  onConfirm = async () => {
    this.props.closeConfirmation();

    try {
      this.setState({ isLoading: true });
      const { data } = await axios.post('/api/conjunctions', {
        UserId: this.props.userData.id,
        CommunityId: this.props.community.id
      });
      console.log(data);
      Router.pushRoute('communityPage', { communityid: this.props.id });
    } catch (err) {
      console.log(err.response || err);
      this.setState({ isLoading: false });
    }
  };

  onCancel = async () => {
    this.props.closeConfirmation();
  };

  render() {
    let { community } = this.props;
    const isJoined = community.Users.some(
      user => user.id === this.props.userData.id
    );

    return (
      <Layout>
        <Grid stackable columns={1}>
          <Grid.Column>
            <Header as="h2" inverted floated="left">
              {community.name}
            </Header>
            <Button
              id="join"
              loading={this.state.isLoading}
              floated="right"
              onClick={this.onJoinCommunity}
              color="blue"
              content={isJoined ? 'Joined' : 'Join'}
              icon={isJoined ? 'check' : 'group'}
              label={{
                basic: true,
                color: 'blue',
                pointing: 'left',
                content: `${community.Users.length} Members`
              }}
              style={{
                pointerEvents: `${isJoined ? 'none' : 'auto'}`
              }}
            />
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
        <ConfirmationDialog
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          content="Are you sure want to join this community ?"
          size="tiny"
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openConfirmation: () => dispatch(openConfirmation()),
    closeConfirmation: () => dispatch(closeConfirmation())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityPage);
