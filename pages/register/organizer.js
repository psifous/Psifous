import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Checkbox, Grid, Input, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';

class OrganizerRegister extends React.Component {

  render() {
    return (
      <Layout>
        <div className='login-form'>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Create your account as a voter
              </Header>
              <Form size='large'>
                <Segment stacked textAlign='left'>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='First name' placeholder='First name' />
                    <Form.Field control={Input} label='Last name' placeholder='Last name' />
                  </Form.Group>

                  <Form.Input label='Email' type='email' placeholder='enter email' />
                  <Form.Input label='Password' type='password' placeholder='enter password' />
                  <Form.Field control={Input} label='Community Name' placeholder='First name' />
                  <Form.Field control={Input} label='Community location' placeholder='First name' />
                  <Form.Checkbox label='I agree to the Terms and Conditions' />

                  <Button color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Want to Register as Voter? <Link href="/register/voter"><a>Sign Up as Voter</a></Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToprops = state => {
  return {
    isLogin: state.auth
  }
}
export default connect(mapStateToprops, null)(OrganizerRegister);