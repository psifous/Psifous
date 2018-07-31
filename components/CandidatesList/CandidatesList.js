import React from 'react';
import { Grid, Button, Card, Segment, Header } from 'semantic-ui-react';
import { Link } from './../../routes';
import CandidateItem from './../CandidateItem/CandidateItem';

export default props => {
  return (
    <React.Fragment>
      <Grid stackable style={{ marginBottom: 16 }}>
        <Grid.Column width={15}>
          <Link route="addCandidate" params={{ address: props.address }}>
            <Button icon="add" content="Add new candidate" primary />
          </Link>
        </Grid.Column>
        <Segment>
          <Header as="h2" content="Candidate List" />
          <Card.Group centered>
            {props.candidates.map(candidate => (
              <CandidateItem key={candidate.id} candidate={candidate} />
            ))}
          </Card.Group>
        </Segment>
      </Grid>
    </React.Fragment>
  );
};
