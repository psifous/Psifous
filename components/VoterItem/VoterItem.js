import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

export default props => {
  return (
    <Segment>{`${props.user.first_name} ${props.user.last_name}`}</Segment>
  );
};
