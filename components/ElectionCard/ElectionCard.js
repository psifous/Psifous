import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import Link from 'next/link';
import moment from 'moment';

class ElectionCard extends Component {
  render() {
    const startDate = moment(this.props.startDate).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    const endDate = moment(this.props.endDate).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    return (
      <Link href={`/dashboard/elections/${this.props.blockchainAddress}`}>
        <Card fluid onClick={this.props.onClick}>
          <Card.Content>
            <Button
              id="delete-button"
              floated="right"
              icon="trash"
              color="red"
              content="Delete"
            />
            <Link href="/home/communities/election">
              <Button
                id="vote-button"
                floated="right"
                icon="list alternate"
                color="blue"
                content="Detail Election"
              />
            </Link>
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
