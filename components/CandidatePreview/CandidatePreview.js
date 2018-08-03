import React, { Component } from 'react';
import { Card, Icon, Image, Checkbox } from 'semantic-ui-react';

class CardExampleImageCard extends Component {
  render() {
    return (
      <Card>
        <Image src={this.props.image} />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default CardExampleImageCard;
