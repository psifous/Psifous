import React, { Component } from 'react';
import { Grid, Container, Button, Segment, Header } from 'semantic-ui-react';
import axios from '@/axios';
import Layout from '@/components/Layout/Layout';
import VotersList from '@/components/VotersList/VotersList';
import CandidatesList from '@/components/CandidatesList/CandidatesList';
import UserListModal from '@/components/UserListModal/UserListModal';
import BarChart from '@/components/BarChart/BarChart';
import PieChart from '@/components/PieChart/PieChart';
import Election from '@/ethereum/election';
import web3 from '@/ethereum/web3';
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

  componentDidMount() {
    setTimeout(this.toggleView, 100);
    this.setState({ totalVoters: this.props.totalVoters });
  }

  onAddVoter = async (userId, blockchainAddress) => {
    this.props.onAddVoterToBlockchain(userId, blockchainAddress);
    // try {
    //   const { data } = await axios.post('/api/conjunctionElections', {
    //     UserId: userId,
    //     ElectionId: this.props.election.id
    //   });

    //   const accounts = await web3.eth.getAccounts();

    //   const ethElection = await Election(this.props.election.blockchainAddress);

    //   await ethElection.methods.addVoter(blockchainAddress).send({
    //     from: accounts[0]
    //   });

    //   const totalVoters = await ethElection.methods.votersCount().call();

    //   this.setState({
    //     totalVoters
    //   });
    // } catch (err) {
    //   console.log(err.response || err);
    // }
  };

  toggleView = () => {
    this.setState(({ GraphName, switchView }) => ({
      switchView: !switchView,
      GraphName: !GraphName
    }));
  };

  render() {
    return (
      <Layout>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container>
                <Segment style={{ padding: 16 }}>
                  <Header as="h2" content="Result" floated="left" />
                  {this.state.GraphName ? (
                    <Button
                      primary={true}
                      content="Switch to Bar Graph"
                      onClick={() => this.toggleView()}
                    />
                  ) : (
                    <Button
                      primary={true}
                      content="Switch to Pie Chart"
                      onClick={() => this.toggleView()}
                    />
                  )}
                  <div className="chart-container">
                    {this.state.switchView ? (
                      <PieChart candidates={this.props.candidates} />
                    ) : (
                      <BarChart candidates={this.props.candidates} />
                    )}
                  </div>
                </Segment>
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <VotersList totalVoters={this.props.voters.length} />
              <UserListModal
                community={this.props.community}
                communityUsers={this.props.communityUsers}
                onAddVoter={this.onAddVoter}
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
    onAddVoterToBlockchain: (userId, userBlockchainAddress) =>
      dispatch(addVoter(userId, userBlockchainAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ElectionShow);
