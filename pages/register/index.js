import React from 'react';
import { connect } from 'react-redux';
import { Link } from '@/routes';
import { Button, Header, Grid } from 'semantic-ui-react';
import Head from 'next/head';

import Layout from '../../components/Layout/Layout';

class Register extends React.Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>Psifous | Register</title>
        </Head>
        <Grid centered columns={2}>
          <Grid.Column textAlign="center">
            <Header as="h2" inverted>
              Choose Your Primary Use
            </Header>

            <Button.Group>
              <Link route="/register/voter">
                <Button primary>Voter</Button>
              </Link>
              <Button.Or />
              <Link route="/register/organizer">
                <Button secondary>Organizer</Button>
              </Link>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  };
};
export default connect(
  mapStateToprops,
  null
)(Register);
