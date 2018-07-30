import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link, Router } from '@/routes';
import axios from '@/axios';

class CommunityCard extends React.Component {
  onJoinCommunity = async () => {
    console.log('community', this.props.id);
    console.log('user', this.props.userData.id);
    try {
      const { data } = await axios.post('/api/conjunctions', {
        UserId: this.props.userData.id,
        CommunityId: this.props.id
      });
      console.log(data);
      console.log('done');
      Router.pushRoute('communityPage', { communityid: this.props.id });
    } catch (err) {
      console.log(err.response || err);
    }
  };

  render() {
    return (
      <Card fluid onClick={this.props.onClick}>
        <Card.Content>
          <Button
            id="join"
            floated="right"
            icon="group"
            color="teal"
            content="Join"
            onClick={this.onJoinCommunity}
          />
          <Card.Header>
            {' '}
            <Link
              route="communityPage"
              params={{ communityid: this.props.id }}
              prefetch
            >
              <a>{this.props.name}</a>
            </Link>
          </Card.Header>
          <Card.Meta>
            <Icon name="point" />
            <span>{this.props.location}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
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
