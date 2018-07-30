import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Card, Icon, Image, Checkbox } from 'semantic-ui-react';

import { selectCandidate } from '@/store/actions/vote/voteActions';
class CardExampleImageCard extends Component {
  render() {
    return (
      <Card style={{ minHeight: '250px' }}>
        <Image src={this.props.image} />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Checkbox
            label="Vote this candidate"
            checked={this.props.selectedCandidate === this.props.index}
            onClick={() => this.props.checkCandidate(this.props.index)}
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedCandidate: state.vote.selectedCandidate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkCandidate: index => dispatch(selectCandidate(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardExampleImageCard);
