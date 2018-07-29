import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import VoterItem from './../VoterItem/VoterItem';
export default props => {
  return (
    <React.Fragment>
      <Header as="h4" attached="top">
        Voters
      </Header>
      <Segment.Group style={{ overflow: 'auto', maxHeight: 200 }}>
        {props.users.map(user => <VoterItem key={user.id} user={user} />)}
      </Segment.Group>
    </React.Fragment>
  );
};
