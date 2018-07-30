import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import axios from '@/axios';
import Election from '@/ethereum/election';
import web3 from '@/ethereum/web3';
import { Router } from '@/routes';
import Layout from '@/components/Layout/Layout';
import VoteCard from '@/components/VoteCard/VoteCard';

class ElectionPage extends React.Component {
  static async getInitialProps(ctx) {
    const { electionid } = ctx.query;
    const { data } = await axios.get(`/api/elections/${electionid}`);
    const election = data.value;

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

    const candidatesInfo = ethCandidates.reduce((acc, candidate, index) => {
      acc[candidate.id] = {
        name: candidate.name,
        voteCount: candidate.voteCount,
        index
      };

      return acc;
    }, {});

    const tempCandidates = election.Candidates;

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

    return { election, candidates };
  }

  onVoteCandidate = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const ethElection = await Election(this.props.election.blockchainAddress);
      await ethElection.methods.submitVote(this.props.selectedCandidate).send({
        from: accounts[0]
      });
      console.log('done');

      Router.pushRoute('electionPage', {
        communityid: this.props.election.CommunityId,
        electionid: this.props.election.id
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <Layout>
        <VoteCard
          candidates={this.props.candidates}
          onVoteCandidate={this.onVoteCandidate}
        />
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth.isLogin,
    selectedCandidate: state.vote.selectedCandidate
  };
};
export default connect(
  mapStateToprops,
  null
)(ElectionPage);
