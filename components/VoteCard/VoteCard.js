import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Grid } from 'semantic-ui-react';
import Link from 'next/link';

import CandidateCard from '../CandidateCard/CandidateCard';

class VoteCard extends React.Component {
    state = {
      candidates : [
      {
      id: 1,
      name: "Tatang Suherman",
      image: "ga ada gambar",
      description: "calon yang masih belum memiliki pekerjaan",
      ElectionId: 1,
      createdAt: "2018-07-29T02:07:39.259Z",
      updatedAt: "2018-07-29T02:07:39.259Z"
      },
      {
      id: 2,
      name: "Cak Lontongs",
      image: "ga ada gambar",
      description: "calon kaga punya visi dan misi yang jelas",
      ElectionId: 1,
      createdAt: "2018-07-29T02:07:39.259Z",
      updatedAt: "2018-07-29T02:07:39.259Z"
      },
      {
      id: 3,
      name: "Benny Dolo",
      image: "ga ada gambar",
      description: "calon yang masih belum memiliki pekerjaan",
      ElectionId: 1,
      createdAt: "2018-07-29T02:07:39.259Z",
      updatedAt: "2018-07-29T02:07:39.259Z"
      }
    ]
    }

  render() {
    const {candidates} = this.state
    return (
      <Segment padded='very'>
        <Grid relaxed columns={4}>
          {candidates.map( candidate => (
            <Grid.Column>
              <CandidateCard {...candidate } />
            </Grid.Column>
          ))}
        </Grid>
        <Link href='/home'>
          <Button
            id="vote-button"
            floated="right"
            icon="check"
            color="blue"
            content="Vote"
          />
        </Link>
      </Segment>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(VoteCard);