import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Grid } from 'semantic-ui-react';
import { Link } from '@/routes';

import CandidateCard from '../CandidateCard/CandidateCard';

class VoteCard extends React.Component {
  render() {
    const { candidates } = this.props;
    return (
      <Segment padded="very">
        <Grid relaxed>
          <Grid.Row columns={3}>
            {candidates.map(candidate => (
              <Grid.Column key={candidate.id}>
                <CandidateCard {...candidate} />
              </Grid.Column>
            ))}
          </Grid.Row>
          <Grid.Row centered>
            <Button
              id="vote-button"
              icon="check"
              color="blue"
              content="Vote"
              onClick={this.props.onVoteCandidate}
              disabled={!this.props.selectedCandidate}
            />
          </Grid.Row>
        </Grid>
      </Segment>
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
)(VoteCard);
