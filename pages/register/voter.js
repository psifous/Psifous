import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Checkbox, Grid, Input, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router'
import axios from 'axios';

import Layout from '../../components/Layout/Layout';

class VoterRegister extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  registerUser = (event) => {
    let {firstName, lastName, email, password } = this.state 
    const newUser = {firstName, lastName, email, password }
    axios.post('/api/users/', newUser)
      .then((user) => {
        Router.push('/home')
      })
      .catch( err => {
        console.log(err.response)
      })
  }

  render() {

    return (
      <Layout>
        <div>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Create your account as a voter
              </Header>
              <Form size='large'>
                <Segment stacked textAlign='left'>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='First name' placeholder='First name' onChange={this.handleChange('firstName')} />
                    <Form.Field control={Input} label='Last name' placeholder='Last name' onChange={this.handleChange('lastName')} />
                  </Form.Group>

                  <Form.Input label='Email' type='email' placeholder='enter email' onChange={this.handleChange('email')} />
                  <Form.Input label='Password' type='password' placeholder='enter password' onChange={this.handleChange('password')} />

                  <Button color='teal' fluid size='large' onClick={this.registerUser}>
                    Register
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