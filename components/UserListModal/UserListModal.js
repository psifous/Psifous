import React, { Component } from 'react';
import { Button, Header, Icon, Grid, Modal, Card } from 'semantic-ui-react';
import UserItem from '@/components/UserItem/UserItem';

class UserListModal extends Component {
  render() {
    return (
      <Modal
        trigger={
          <Button icon="user plus" content="Add new voter" color="teal" />
        }
      >
        <Modal.Header>{this.props.community.name}'s Users</Modal.Header>
        <Modal.Content image>
          <Card.Group>
            {this.props.communityUsers.map(user => (
              <UserItem
                user={user}
                key={user.id}
                onAdd={() =>
                  this.props.onAddVoter(user.id, user.blockchainAddress)
                }
              />
            ))}
          </Card.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name="right chevron" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default UserListModal;
