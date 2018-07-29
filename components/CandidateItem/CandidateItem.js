import React from 'react';
import { Grid, Card } from 'semantic-ui-react';

export default props => {
  return (
    <Grid.Column width={5}>
      <Card
        image={props.candidate.image}
        header={props.candidate.name}
        meta="Friend"
        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        style={{ margin: '0 auto' }}
      />
    </Grid.Column>
  );
};
