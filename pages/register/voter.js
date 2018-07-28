import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Checkbox, Grid, Input, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';

class VoterRegister extends React.Component {

  render() {
    return (
      <Layout>
        <div className='login-form'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
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
                  <Form.Checkbox label='I agree to the Terms and Conditions' />

                  <Button color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Want to Register as Organizer? <Link href="/register/organizer"><a>Sign Up as Organizer</a></Link>
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
export default connect(mapStateToprops, null)(VoterRegister);