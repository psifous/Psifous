import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Checkbox, Grid, Input, Header, Image, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';

class OrganizerRegister extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    communityName: '',
    communityLocation: ''
  }
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  registerUser = (event) => {
    let {firstName, lastName, email, password } = this.state 
    const newUser = {firstName, lastName, email, password }
    axios.post('/api/admins/', newUser)
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
        <div className='login-form'>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Create your account as a voter
              </Header>
              <Form size='large'>
                <Segment stacked textAlign='left'>
                  <Form.Group widths='equal'>
                    <Form.Field control={Input} label='First name' placeholder='First name' onClick={this.handleChange('firstName')} />
                    <Form.Field control={Input} label='Last name' placeholder='Last name' onClick={this.handleChange('lastName')} />
                  </Form.Group>

                  <Form.Input label='Email' type='email' placeholder='enter email' onClick={this.handleChange('email')} />
                  <Form.Input label='Password' type='password' placeholder='enter password' onClick={this.handleChange('password')} />
                  <Form.Field control={Input} label='Community Name' placeholder='Community Name' onClick={this.handleChange('communityName')} />
                  <Form.Field control={Input} label='Community location' placeholder='Comunity Location' onClick={this.handleChange('communityLocation')} />
                  <Form.Checkbox label='I agree to the Terms and Conditions' />

                  <Button color='teal' fluid size='large'>
                    Register
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