import React, { Component } from 'react';
import Link from 'next/link';
import { Card, Icon, Image, Checkbox } from 'semantic-ui-react';

class CardExampleImageCard extends Component {
  render() {
    return (
      <Card style={{ minHeight: '100vh' }}>
        <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Checkbox label="Vote this candidate" />
        </Card.Content>
      </Card>
    );
  }
}

export default CardExampleImageCard;
