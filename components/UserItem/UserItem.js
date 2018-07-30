import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

export default props => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{`${props.user.first_name} ${
          props.user.last_name
        }`}</Card.Header>
        <Card.Meta>{props.user.email}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={props.onAdd}>
            Add as Voter
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};
