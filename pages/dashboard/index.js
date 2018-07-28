import React, { Component } from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import ElectionCard from '../../components/ElectionCard/ElectionCard';

class Dashboard extends Component {
  static getInitialProps() {
    const elections = [
      {
        id: 1,
        name: 'Pemain bola terbaik masa kini',
        description: 'ya begitulah',
        startDate: '2018-07-27T08:45:25.821Z',
        endDate: '2018-07-30T08:45:25.821Z',
        blockchainAddress: 'www.google.com',
        CommunityId: 1,
        createdAt: '2018-07-28T04:38:53.353Z',
        updatedAt: '2018-07-28T04:38:53.353Z'
      },
      {
        id: 2,
        name: 'Pemain basket terbaik tahun 2000',
        description: 'ya begitulah',
        startDate: '2018-07-27T08:45:25.821Z',
        endDate: '2018-07-30T08:45:25.821Z',
        blockchainAddress: 'www.google.com',
        CommunityId: 1,
        createdAt: '2018-07-28T04:38:53.354Z',
        updatedAt: '2018-07-28T04:38:53.354Z'
      },
      {
        id: 3,
        name: 'Pelatih Volley masa kini',
        description: 'ya begitulah',
        startDate: '2018-07-27T08:45:25.821Z',
        endDate: '2018-07-30T08:45:25.821Z',
        blockchainAddress: 'www.google.com',
        CommunityId: 1,
        createdAt: '2018-07-28T04:38:53.354Z',
        updatedAt: '2018-07-28T04:38:53.354Z'
      }
    ];

    return { elections };
  }

  render() {
    return (
      <Layout>
        <Link href="dashboard/elections/new">
          <Button icon="add" content="Add new election" primary />
        </Link>
        <Header as="h2">New Elections</Header>
        <Grid columns={1}>
          {this.props.elections.map(election => (
            <Grid.Row key={election.id}>
              <ElectionCard {...election} />
            </Grid.Row>
          ))}
        </Grid>
        <style jsx>{`
          h1 {
            color: blue;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Dashboard;
