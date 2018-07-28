import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import Layout from '../components/Layout/Layout';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  loginHandle = async () => {
    let userData = this.state
    await axios.post('/api/login', userData)
    Routes.push('/home')
  }

  render() {
    return (
      <Layout>
        <div>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input 
                    fluid 
                    icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail address'
                    onChange={this.handleChange('email')}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange('password')}
                  />

                  <Button color='teal' fluid size='large' onClick={this.loginHandle}>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link href="/register"><a>Sign Up</a></Link>
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
export default connect(mapStateToprops, null)(LoginForm);