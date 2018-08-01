import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Grid, Card, Header } from 'semantic-ui-react';
import { Link } from '@/routes';

import CandidateCard from '../CandidateCard/CandidateCard';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

import {
  openConfirmation,
  closeConfirmation,
  startLoading,
  stopLoading
} from './../../store/actions/ui/uiActions';

class VoteCard extends React.Component {
  onConfirm = () => {
    this.props.closeConfirmation();
    this.props.onVoteCandidate();
  };

  onCancel = () => {
    this.props.closeConfirmation();
  };

  onVoteClick = () => {
    this.props.openConfirmation();
  };

  render() {
    const { candidates } = this.props;
    return (
      <Segment padded="very">
        <Header as="h2" content={this.props.election.name} />
        <Header as="h3" content="Vote Booth" />
        <Grid columns={1}>
          <Grid.Column>
            <Card.Group centered>
              {candidates.map(candidate => (
                <CandidateCard key={candidate.id} {...candidate} />
              ))}
            </Card.Group>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Button
              id="vote-button"
              icon="check"
              color="blue"
              content="Vote"
              onClick={this.onVoteClick}
              disabled={this.props.selectedCandidate === null}
              size="huge"
              loading={this.props.isLoading}
            />
          </Grid.Column>
        </Grid>
        <ConfirmationDialog
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    selectedCandidate: state.vote.selectedCandidate,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openConfirmation: () => dispatch(openConfirmation()),
    closeConfirmation: () => dispatch(closeConfirmation()),
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteCard);
