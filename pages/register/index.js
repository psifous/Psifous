import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button, Checkbox, Form, Segment, Grid } from 'semantic-ui-react';

import Layout from '../../components/Layout/Layout';

class Register extends React.Component {

  render() {
    return (
      <Layout>
        <Grid centered columns={2}>
          <Grid.Column textAlign='center'>
            <h1>Choose your primary use</h1>
            <Link href="/register/voter">
              <Button>
                Voter
              </Button>
            </Link>

            <Link href="/register/organizer">
              <Button>
               Organizer
              </Button>
            </Link>
          </Grid.Column>
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
export default connect(mapStateToprops, null)(Register);