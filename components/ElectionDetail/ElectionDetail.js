import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Checkbox,
  Form,
  Segment,
  Grid,
  Card,
  Icon,
  Image
} from 'semantic-ui-react';
import { Link } from '../../routes';

import CandidatePreview from '../CandidatePreview/CandidatePreview';

class ElectionPage extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns={3}>
          {this.props.candidates.map(candidate => (
            <Grid.Column>
              <CandidatePreview {...candidate} />
            </Grid.Column>
          ))}
        </Grid.Row>
        <Grid.Row width={8}>
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
              color="blue"
              content="Vote Candidate"
            />
          </Link>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  };
};
export default connect(
  mapStateToprops,
  null
)(ElectionPage);
