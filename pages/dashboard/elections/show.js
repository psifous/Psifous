import React, { Component } from 'react';
import {
  Grid,
  Image,
  Segment,
  Container,
  Card,
  Header
} from 'semantic-ui-react';
import Layout from '../../../components/Layout/Layout';
import VotersList from './../../../components/VotersList/VotersList';
import CandidatesList from './../../../components/CandidatesList/CandidatesList';
import Election from '../../../ethereum/election';
import web3 from '../../../ethereum/web3';

export default class ElectionShow extends Component {
  static async getInitialProps(props) {
    const election = await Election(
      '0x2785b6Db590d1e3aba5fA991ab501E538D308CbF'
    );

    const candidatesCount = await election.methods.getCandidatesCount().call();

    const candidatesX = await Promise.all(
      Array(parseInt(candidatesCount))
        .fill()
        .map((element, index) => {
          return election.methods.candidates(index).call();
        })
    );

    console.log(candidatesX);

    const users = [
      {
        id: 1,
        email: 'test1@email.com',
        first_name: 'test1',
        last_name: 'test',
        password: '12345',
        createdAt: '2018-07-28T04:38:53.195Z',
        updatedAt: '2018-07-28T04:38:53.195Z'
      },
      {
        id: 2,
        email: 'test2@email.com',
        first_name: 'test2',
        last_name: 'test',
        password: '12345',
        createdAt: '2018-07-28T04:38:53.195Z',
        updatedAt: '2018-07-28T04:38:53.195Z'
      },
      {
        id: 3,
        email: 'test3@email.com',
        first_name: 'test3',
        last_name: 'test',
        password: '12345',
        createdAt: '2018-07-28T04:38:53.195Z',
        updatedAt: '2018-07-28T04:38:53.195Z'
      },
      {
        id: 4,
        email: 'test3@email.com',
        first_name: 'test4',
        last_name: 'test',
        password: '12345',
        createdAt: '2018-07-28T04:38:53.195Z',
        updatedAt: '2018-07-28T04:38:53.195Z'
      },
      {
        id: 5,
        email: 'test3@email.com',
        first_name: 'test5',
        last_name: 'test',
        password: '12345',
        createdAt: '2018-07-28T04:38:53.195Z',
        updatedAt: '2018-07-28T04:38:53.195Z'
      }
    ];

    const candidates = [
      {
        id: 1,
        name: 'Tatang Suherman',
        image:
          'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Dan_Donovan.jpg',
        description: 'calon yang masih belum memiliki pekerjaan',
        ElectionId: 1,
        createdAt: '2018-07-28T04:38:53.364Z',
        updatedAt: '2018-07-28T04:38:53.364Z'
      },
      {
        id: 2,
        name: 'Cak Lontongs',
        image:
          'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/Nydia_Velazquez.jpg',
        description: 'calon kaga punya visi dan misi yang jelas',
        ElectionId: 1,
        createdAt: '2018-07-28T04:38:53.364Z',
        updatedAt: '2018-07-28T04:38:53.364Z'
      },
      {
        id: 3,
        name: 'Benny Dolo',
        image:
          'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/HakeemJeffries.jpg',
        description: 'calon yang masih belum memiliki pekerjaan',
        ElectionId: 1,
        createdAt: '2018-07-28T04:38:53.364Z',
        updatedAt: '2018-07-28T04:38:53.364Z'
      },
      {
        id: 4,
        name: 'Benny Dolo',
        image:
          'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/HakeemJeffries.jpg',
        description: 'calon yang masih belum memiliki pekerjaan',
        ElectionId: 1,
        createdAt: '2018-07-28T04:38:53.364Z',
        updatedAt: '2018-07-28T04:38:53.364Z'
      },
      {
        id: 5,
        name: 'Benny Dolo',
        image:
          'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/HakeemJeffries.jpg',
        description: 'calon yang masih belum memiliki pekerjaan',
        ElectionId: 1,
        createdAt: '2018-07-28T04:38:53.364Z',
        updatedAt: '2018-07-28T04:38:53.364Z'
      },
      {
        id: 6,
        name: 'Benny Dolo',
        image:
          'https://api.ballotpedia.org/v3/thumbnail/200/300/crop/best/HakeemJeffries.jpg',
        description: 'calon yang masih belum memiliki pekerjaan',
        ElectionId: 1,
        createdAt: '2018-07-28T04:38:53.364Z',
        updatedAt: '2018-07-28T04:38:53.364Z'
      }
    ];

    return { users, candidates, candidatesX };
  }

  render() {
    return (
      <Layout>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container>
                <h3>Result</h3>
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <VotersList users={this.props.users} />
            </Grid.Column>
            <Grid.Column width={11}>
              <CandidatesList candidates={this.props.candidates} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
