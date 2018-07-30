import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from '../../routes';
import moment from 'moment';
import axios from '@/axios'

class CommunityCard extends React.Component {

  joinCommunity = async () => {

    let { data } = await axios.post(
      '/api/conjunctions',
      {
        CommunityId: this.props.id
      }
    )

  }

  render() {
    const createdAt = moment(this.props.createdAt).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    const updatedAt = moment(this.props.updatedAt).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
    return (
      <Link route='communityPage' params={{ communityid : this.props.id }} prefetch>
        <Card fluid onClick={this.props.onClick}>
          <Card.Content>
            <Button 
              id="delete-button"
              floated="right"
              color="blue"
              content="Join this Community"
              onClick={this.joinCommunity}
            />
            <Card.Header>{this.props.name}</Card.Header>
            <Card.Meta>
              <strong>Location:</strong>
              {this.props.location}
            </Card.Meta>
          </Card.Content>
        </Card>
      </Link>
    )
  }
}

export default CommunityCard