import React from 'react';
import { Grid, Button, Card, Segment, Header } from 'semantic-ui-react';
import { Link } from './../../routes';
import CandidateItem from './../CandidateItem/CandidateItem';
import EmptyMessage from '@/components/EmptyMessage/EmptyMessage';

export default props => {
  const emptyMessage = (
    <EmptyMessage color="teal" text="No candidates registered" />
  );
  return (
    <Grid stackable style={{ marginBottom: 16 }} columns={1}>
      <Grid.Column>
        <Link route="addCandidate" params={{ address: props.address }}>
          <Button icon="add" content="Add new candidate" primary />
        </Link>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Header as="h2" content="Candidate List" />
          {props.candidates.length > 0 ? (
            <Card.Group centered>
              {props.candidates.map(candidate => (
                <CandidateItem key={candidate.id} candidate={candidate} />
              ))}
            </Card.Group>
          ) : (
            emptyMessage
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
