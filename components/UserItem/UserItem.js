import React from 'react';
import { Button, Card, Image, Segment } from 'semantic-ui-react';

export default props => {
  return (
    <Card fluid color="teal">
      <Card.Content floated="left">
        <Segment floated="left">
          <Card.Header>{`${props.user.first_name} ${
            props.user.last_name
          }`}</Card.Header>
          <Card.Meta>{props.user.email}</Card.Meta>
        </Segment>
        <Button floated="right" basic color="green" onClick={props.onAdd}>
          Add as Voter
        </Button>
      </Card.Content>
    </Card>
  );
};
