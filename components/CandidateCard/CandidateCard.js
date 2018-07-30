import React, { Component } from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import { Card, Icon, Image, Checkbox } from 'semantic-ui-react';

import { selectCandidate } from '@/store/actions/vote/voteActions';
class CardExampleImageCard extends Component {


  render () {
    return (
      <Card>
        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Checkbox label='Vote this candidate' onChange={() => this.props.checkCandidate(this.props.id)} /> 
        </Card.Content>
      </Card>
    )
  }

}

const mapStateToProps = state => {
  return {
    selectedCandidate: state.vote.selectedCandidate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkCandidate: (index) => dispatch(selectCandidate(index))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardExampleImageCard)