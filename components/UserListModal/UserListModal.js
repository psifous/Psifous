import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Grid,
  Modal,
  Card,
  Container
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserItem from '@/components/UserItem/UserItem';

class UserListModal extends Component {
  render() {
    let content = (
      <Card.Group>
        {this.props.communityUsers.map(user => (
          <UserItem
            user={user}
            key={user.id}
            onAdd={() => this.props.onAddVoter(user.id, user.blockchainAddress)}
          />
        ))}
      </Card.Group>
    );

    if (this.props.isLoading) {
      content = (
        <Container textAlign="center" fluid>
          <Icon.Group size="huge">
            <Icon loading size="big" color="teal" name="circle notch" />
            <Icon name="add user" />
          </Icon.Group>
          <Header as="h2" color="teal">
            Please wait, adding voter to blockchain...
          </Header>
        </Container>
      );
    }

    return (
      <Modal
        trigger={
          <Button icon="user plus" content="Add new voter" color="teal" />
        }
      >
        <Modal.Header>{this.props.community.name}'s Users</Modal.Header>
        <Modal.Content>{content}</Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

export default connect(
  mapStateToProps,
  null
)(UserListModal);
