import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Header, Grid } from 'semantic-ui-react';

import Layout from '../../components/Layout/Layout';
import CommunityCard from '../../components/CommunityCard/CommunityCard';

class HomePage extends React.Component {

  static getInitialProps () {
    const communities = [
        {
        id: 1,
        name: "Sepakbola",
        location: "Jakarta Pusat",
        AdminId: 1,
        createdAt: "2018-07-28T04:41:55.236Z",
        updatedAt: "2018-07-28T04:41:55.236Z"
        },
        {
        id: 2,
        name: "Basket",
        location: "Jawa Barat",
        AdminId: 2,
        createdAt: "2018-07-28T04:41:55.236Z",
        updatedAt: "2018-07-28T04:41:55.236Z"
        },
        {
        id: 3,
        name: "Volley",
        location: "Papua Tengah",
        AdminId: 3,
        createdAt: "2018-07-28T04:41:55.236Z",
        updatedAt: "2018-07-28T04:41:55.236Z"
        }
      ];

    return { communities };
  }

  render() {
    const { communities } = this.props
    return (
      <Layout>
        <Header as="h2"> The Communities that you follow</Header>
        <Grid columns={1}>
          {this.props.communities.map( community => (
            <Grid.Row key={community.id}>
            <Grid.Column>
              <CommunityCard {...community}/>
            </Grid.Column>
          </Grid.Row>
          ))}
        </Grid>
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(HomePage);