import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Card, Segment } from 'semantic-ui-react';
import { Link } from '@/routes';

import CandidatePreview from '../CandidatePreview/CandidatePreview';
import moment from 'moment';

class ElectionPage extends React.Component {
  render() {
    const now = moment();
    const startDate = moment(this.props.election.startDate);
    const endDate = moment(this.props.election.endDate);

    const canVote = now.isBetween(startDate, endDate);
    const isValidVoter = this.props.election.Users.some(
      user => user.id === this.props.userData.id
    );

    console.log(this.props.election);

    return (
      <Grid columns={1} stackable>
        <Grid.Column>
          <Segment>
            <Header as="h2" color="teal" content={this.props.election.name} />
            <p>{this.props.election.description}</p>
            <p>
              {`${moment(startDate).format('MMMM Do YYYY, h:mm a')} -
                ${moment(endDate).format('MMMM Do YYYY, h:mm a')}`}
            </p>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Card.Group centered>
            {this.props.candidates.map(candidate => (
              <CandidatePreview {...candidate} key={candidate.id} />
            ))}
          </Card.Group>
        </Grid.Column>
        <Grid.Column width={16}>
          {isValidVoter ? (
            <Link
              route="voteBoothPage"
              params={{
                communityid: this.props.election.CommunityId,
                electionid: this.props.election.id
              }}
              prefetch
            >
              <Button
                id="vote-button"
                icon="check"
                color="red"
                content="Start Voting"
                disabled={!canVote}
                fluid
                size="large"
              />
            </Link>
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth.isLogin,
    userData: state.auth.userData
  };
};
export default connect(
  mapStateToprops,
  null
)(ElectionPage);
