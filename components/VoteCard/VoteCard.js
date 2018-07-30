import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Grid } from 'semantic-ui-react';
import Link from 'next/link';

import CandidateCard from '../CandidateCard/CandidateCard';

class VoteCard extends React.Component {

  render() {
    const {Candidates} = this.props
    return (
      <Segment padded='very'>
        <Grid relaxed>
          <Grid.Row columns={3}>
            {Candidates.map( candidate => (
              <Grid.Column key={candidate.id}>
                <CandidateCard {...candidate } />
              </Grid.Column>
            ))}
          </Grid.Row>
          <Grid.Row>
            <Link href='/home'>
              <Button
                id="vote-button"
                floated="right"
                icon="check"
                color="blue"
                content="Vote"
              />
            </Link>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(VoteCard);