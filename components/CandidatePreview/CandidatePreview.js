import React, { Component } from 'react';
import { Card, Icon, Image, Checkbox } from 'semantic-ui-react';

class CardExampleImageCard extends Component {

  render () {
    return (
      <Card>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
      </Card>
    )
  }

}


export default CardExampleImageCard