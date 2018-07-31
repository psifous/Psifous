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

export default class ElectionShow extends Component {
  static async getInitialProps(ctx) {
    const { data: community } = await axios.get(
      `/api/communities/${ctx.userData.communityId}`
    );

    const communityUsers = community.value.Users.map(user => {
      user.blockchainAddress = '0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db';
      return user;
    });

    const response = await axios.get(`/api/elections/${ctx.query.address}`);

    const election = response.data.value;

    const ethElection = await Election(election.blockchainAddress);

    const candidatesCount = await ethElection.methods
      .getCandidatesCount()
      .call();

    const ethCandidates = await Promise.all(
      Array(parseInt(candidatesCount))
        .fill()
        .map((element, index) => {
          return ethElection.methods.candidates(index).call();
        })
    );

    const totalVoters = await ethElection.methods.votersCount().call();

    const candidatesInfo = ethCandidates.reduce((acc, candidate, index) => {
      acc[candidate.id] = {
        name: candidate.name,
        voteCount: candidate.voteCount,
        index
      };

      return acc;
    }, {});

    const tempCandidates = response.data.value.Candidates;

    const candidates = tempCandidates.reduce((acc, candidate) => {
      const candidateInfo = candidatesInfo[candidate.id];
      if (candidateInfo) {
        acc.push({
          ...candidate,
          voteCount: candidateInfo.voteCount,
          index: candidateInfo.index
        });
      }
      return acc;
    }, []);

    return {
      election,
      totalVoters: +totalVoters,
      candidates,
      address: ctx.query.address,
      community: community.value,
      communityUsers
    };
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
    try {
      const { data } = await axios.post('/api/conjunctionElections', {
        UserId: userId,
        ElectionId: this.props.election.id
      });

      const accounts = await web3.eth.getAccounts();

      const ethElection = await Election(this.props.election.blockchainAddress);

      await ethElection.methods.addVoter(blockchainAddress).send({
        from: accounts[0]
      });

      const totalVoters = await ethElection.methods.votersCount().call();

      this.setState({
        totalVoters
      });
    } catch (err) {
      console.log(err.response || err);
    }
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
              <VotersList totalVoters={this.state.totalVoters} />
              <UserListModal
                community={this.props.community}
                communityUsers={this.props.communityUsers}
                onAddVoter={this.onAddVoter}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <CandidatesList
                candidates={this.props.candidates}
                address={this.props.address}
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
