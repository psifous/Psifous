import React from 'react';
import { Grid, Card } from 'semantic-ui-react';

export default props => {
  return (
    <Card
      image={props.candidate.image}
      header={props.candidate.name}
      meta={props.candidate.index}
      description={props.candidate.description}
    />
  );
};
