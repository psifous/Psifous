import React from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';
import axios from '@/axios';
import Election from '@/ethereum/election';
import Layout from '@/components/Layout/Layout';
import ElectionDetail from '@/components/ElectionDetail/ElectionDetail';
import BarChart from '@/components/BarChart/BarChart';
import PieChart from '@/components/PieChart/PieChart';

import {
  fetchElection,
  addVoter
} from '@/store/actions/election/electionActions';

class ElectionPage extends React.Component {
  static async getInitialProps(ctx) {
    const { electionid } = ctx.query;

    await ctx.reduxStore.dispatch(
      fetchElection({
        communityId: ctx.query.communityid,
        electionId: electionid
      })
    );

    return {};
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

const mapStateToProps = state => {
  return {
    election: state.election.election,
    community: state.election.community,
    voters: state.election.voters,
    candidates: state.election.candidates,
    communityUsers: state.election.communityUsers
  };
};

export default connect(
  mapStateToProps,
  null
)(ElectionPage);
