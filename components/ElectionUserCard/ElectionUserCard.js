import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from '@/routes';
import moment from 'moment';

class ElectionUserCard extends Component {
  render() {
    const startDate = moment(this.props.startDate).format(
      'MMMM Do YYYY, h:mm a'
    );
    const endDate = moment(this.props.endDate).format('MMMM Do YYYY, h:mm a');
    return (
      <Card fluid onClick={this.props.onClick}>
        <Card.Content>
          <Link
            route="electionPage"
            params={{
              communityid: this.props.CommunityId,
              electionid: this.props.id
            }}
            prefetch
          >
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
            <strong>Start Date: </strong>
            {startDate}
          </Card.Meta>
          <Card.Meta>
            <strong>End Date: </strong>
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
    );
  }
}

export default ElectionUserCard;
