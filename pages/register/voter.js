import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

import {
  Button,
  Form,
  Grid,
  Input,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { Link, Router } from '@/routes';
import axios from '@/axios';
import web3 from '@/ethereum/web3';
import Layout from '@/components/Layout/Layout';

import { registerVoter } from './../../store/actions/auth/authActions';

class VoterRegister extends React.Component {
  state = {
    controls: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    isLoading: false,
    isValid: false
  };

  checkValidity = () => {
    const controls = { ...this.state.controls };
    const isValid = Object.keys(controls).every(
      input => controls[input].trim() !== ''
    );
    this.setState({
      isValid
    });
  };

  handleChange = (prop, value) => {
    this.setState(
      prevState => {
        return {
          controls: {
            ...prevState.controls,
            [prop]: value
          }
        };
      },
      () => this.checkValidity()
    );
  };

  registerUser = async event => {
    let { firstName, lastName, email, password } = this.state.controls;
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };

    this.props.onRegister(newUser);
  };

  render() {
    return (
      <Layout>
        <Head>
          <title>Psifous | Register as Organizer</title>
        </Head>
        <div>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" inverted textAlign="center">
                Create Your Account As a Voter
              </Header>
              <Form size="large" onSubmit={this.registerUser}>
                <Segment stacked textAlign="left">
                  <Header
                    as="h2"
                    color="teal"
                    textAlign="center"
                    content="Voter"
                  />
                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label="First name"
                      placeholder="First name"
                      onChange={e =>
                        this.handleChange('firstName', e.target.value)
                      }
                    />
                    <Form.Field
                      control={Input}
                      label="Last name"
                      placeholder="Last name"
                      onChange={e =>
                        this.handleChange('lastName', e.target.value)
                      }
                    />
                  </Form.Group>
                  <Form.Input
                    label="Email"
                    type="email"
                    placeholder="enter email"
                    onChange={e => this.handleChange('email', e.target.value)}
                  />
                  <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    onChange={e =>
                      this.handleChange('password', e.target.value)
                    }
                  />
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    disabled={!this.state.isValid}
                    loading={this.props.isLoading}
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                Want to Register as Organizer?{' '}
                <Link href="/register/organizer">
                  <a>Register as Organizer</a>
                </Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: registrationData => dispatch(registerVoter(registrationData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoterRegister);
