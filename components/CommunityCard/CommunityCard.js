import React from 'react';
import { Card, Icon, Header, CardContent } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, Router } from '@/routes';
import axios from '@/axios';

class CommunityCard extends React.Component {
  render() {
    return (
      <Link
        route="communityPage"
        params={{ communityid: this.props.id }}
        prefetch
      >
        <Card fluid onClick={this.props.onClick}>
          <Card.Content>
            <Card.Header>
              <Header as="h3" color="blue">
                {this.props.name}
              </Header>
            </Card.Header>
            <Card.Description>Description here</Card.Description>
          </Card.Content>
          <CardContent extra>
            <Card.Meta>
              <Icon name="point" color="teal" />
              <span>{this.props.location}</span>
            </Card.Meta>
          </CardContent>
        </Card>
      </Link>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData
  };
};

export default connect(
  mapStateToProps,
  null
)(CommunityCard);
