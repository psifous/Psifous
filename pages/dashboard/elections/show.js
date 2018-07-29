import React, { Component } from 'react';
import {
  Grid,
  Image,
  Segment,
  Container,
  Card,
  Header
} from 'semantic-ui-react';
import axios from 'axios';
import Layout from '../../../components/Layout/Layout';
import VotersList from './../../../components/VotersList/VotersList';
import CandidatesList from './../../../components/CandidatesList/CandidatesList';
import Election from '../../../ethereum/election';
import web3 from '../../../ethereum/web3';

export default class ElectionShow extends Component {
  static async getInitialProps(ctx) {
    const { data: info } = await axios.get(
      'http://localhost:3000/api/users/me',
      {
        headers: {
          Authorization: ctx.authtoken
        }
      }
    );

    const response = await axios.get(
      `http://localhost:3000/api/elections/${ctx.query.address}`
    );

    const election = {
      name: response.data.value.name,
      description: response.data.value.description,
      startDate: response.data.value.startDate,
      endDate: response.data.value.endDate,
      blockchainAddress: response.data.value.blockchainAddress
    };

    const ethElection = await Election(election.blockchainAddress);

    const candidatesCount = await ethElection.methods
      .getCandidatesCount()
      .call();

    const ethCandidates = await Promise.all(
      Array(parseInt(candidatesCount))
        .fill()
        .map((element, index) => {
          return ethElection.methods.candidates(index).call();
        })
    );

    const candidatesInfo = ethCandidates.reduce((acc, candidate, index) => {
      acc[candidate.id] = {
        name: candidate.name,
        voteCount: candidate.voteCount,
        index
      };

      return acc;
    }, {});

    console.log('info', candidatesInfo);

    console.log('ethCandidate', ethCandidates);

    const tempCandidates = response.data.value.Candidates;

    console.log('tempCandidate', tempCandidates);

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

    const candidates = tempCandidates.reduce((acc, candidate) => {
      const candidateInfo = candidatesInfo[candidate.id];
      if (candidateInfo) {
        acc.push({
          ...candidate,
          voteCount: candidateInfo.voteCount,
          index: candidateInfo.index
        });
      }
      return acc;
    }, []);

    console.log('makan', candidates);

    return { users, candidates, address: ctx.query.address };
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
              <CandidatesList
                candidates={this.props.candidates}
                address={this.props.address}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
