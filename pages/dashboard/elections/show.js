import React, { Component } from 'react';
import { Grid, Container, Button, Segment, Header } from 'semantic-ui-react';
import io from 'socket.io-client';
import moment from 'moment';
import Layout from '@/components/Layout/Layout';
import VotersList from '@/components/VotersList/VotersList';
import CandidatesList from '@/components/CandidatesList/CandidatesList';
import UserListModal from '@/components/UserListModal/UserListModal';
import BarChart from '@/components/BarChart/BarChart';
import PieChart from '@/components/PieChart/PieChart';

import {
  fetchElection,
  addVoter
} from '@/store/actions/election/electionActions';
import { connect } from 'react-redux';

class ElectionShow extends Component {
  static async getInitialProps(ctx) {
    await ctx.reduxStore.dispatch(
      fetchElection({
        communityId: ctx.userData.communityId,
        electionId: ctx.query.address
      })
    );

    return {};
  }

  state = {
    totalVoters: 0,
    switchView: false,
    GraphName: false
  };

  newVoterSubscription = null;
  socket = null;
  async componentDidMount() {
    setTimeout(this.toggleView, 100);
    this.socket = io('https://socket.dwikyerl.me');
    this.socket.on('newVote', data => {
      const electionId = this.props.election.id;
      const communityId = this.props.community.id;
      console.log(electionId, communityId);
      this.props.fetchElection({ electionId, communityId });
    });
  }

  onAddVoter = async (userId, blockchainAddress) => {
    this.props.onAddVoterToBlockchain(userId, blockchainAddress);
  };

  toggleView = () => {
    this.setState(({ GraphName, switchView }) => ({
      switchView: !switchView,
      GraphName: !GraphName
    }));
  };

  render() {
    const noCandidates = this.props.candidates.length === 0;
    const startDate = moment(this.props.election.startDate);
    const endDate = moment(this.props.election.endDate);
    return (
      <Layout>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container>
                <Segment style={{ padding: 16 }}>
                  <Header as="h2" content={this.props.election.name} />
                  <p>
                    {`${moment(startDate).format('MMMM Do YYYY, h:mm a')} -
                ${moment(endDate).format('MMMM Do YYYY, h:mm a')}`}
                  </p>
                  {this.state.GraphName ? (
                    <Button
                      primary={true}
                      content="Switch to Bar Graph"
                      onClick={() => this.toggleView()}
                      disabled={!(this.props.candidates.length >= 2)}
                    />
                  ) : (
                    <Button
                      primary={true}
                      content="Switch to Pie Chart"
                      onClick={() => this.toggleView()}
                      disabled={!(this.props.candidates.length >= 2)}
                    />
                  )}
                  {this.props.candidates.length >= 2 ? (
                    <div className="chart-container">
                      {this.state.switchView ? (
                        <PieChart candidates={this.props.candidates} />
                      ) : (
                        <BarChart candidates={this.props.candidates} />
                      )}
                    </div>
                  ) : null}
                </Segment>
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <VotersList
                totalVoters={this.props.voters.length}
                voters={this.props.voters}
              />
              <UserListModal
                community={this.props.community}
                communityUsers={this.props.communityUsers}
                onAddVoter={this.onAddVoter}
                candidatesTotal={this.props.candidates.length}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <CandidatesList
                candidates={this.props.candidates}
                address={this.props.election.id}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <style jsx>{`
          .chart-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px;
          }
        `}</style>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    election: state.election.election,
    community: state.election.community,
    voters: state.election.voters,
    candidates: state.election.candidates,
    communityUsers: state.election.communityUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchElection: ({ electionId, communityId }) =>
      dispatch(fetchElection({ electionId, communityId })),
    onAddVoterToBlockchain: (userId, userBlockchainAddress) =>
      dispatch(addVoter(userId, userBlockchainAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectionShow);
