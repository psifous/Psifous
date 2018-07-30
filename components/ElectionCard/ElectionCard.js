import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';

import { Link } from '../../routes';

class ElectionCard extends Component {
  render() {
    const startDate = moment(this.props.startDate).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    const endDate = moment(this.props.endDate).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    return (
      <Link route="electionAdmin" params={{ address: this.props.id }} prefetch>
        <Card fluid onClick={this.props.onClick}>
          <Card.Content>
            <Button
              id="delete-button"
              floated="right"
              icon="trash"
              color="red"
              content="Delete"
            />
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>
              <strong>Start Date:</strong>
              {startDate}
            </Card.Meta>
            <Card.Meta>
              <strong>End Date:</strong>
              {endDate}
            </Card.Meta>
          </Card.Content>
          <Card.Content description={this.props.description} />
          <style jsx>{`
            #button {
              color: 'black';
            }
          `}</style>
        </Card>
      </Link>
    );
  }
}

export default ElectionCard;
