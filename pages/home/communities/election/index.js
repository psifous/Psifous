import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import axios from '@/axios';
import Election from '@/ethereum/election';
import web3 from '@/ethereum/web3';

import Layout from '@/components/Layout/Layout';
import ElectionDetail from '@/components/ElectionDetail/ElectionDetail';

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

  render() {
    return (
      <Layout>
        <ElectionDetail
          election={this.props.election}
          candidates={this.props.candidates || []}
        />
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth.isLogin
  };
};
export default connect(
  mapStateToprops,
  null
)(ElectionPage);
