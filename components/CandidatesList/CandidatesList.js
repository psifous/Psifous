import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import Link from 'next/link';
import CandidateItem from './../CandidateItem/CandidateItem';

export default props => {
  return (
    <React.Fragment>
      <Grid centered columns={3} stackable style={{ marginBottom: 16 }}>
        <Grid.Column width={15}>
          <Link href="/dashboard/elections/show/candidates/add">
            <Button icon="add" content="Add new candidate" primary />
          </Link>
        </Grid.Column>
        {props.candidates.map(candidate => (
          <CandidateItem key={candidate.id} candidate={candidate} />
        ))}
      </Grid>
    </React.Fragment>
  );
};