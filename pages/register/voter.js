import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Checkbox,
  Grid,
  Input,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';
import { Link, Router } from '@/routes';
import axios from '@/axios';

import Layout from '@/components/Layout/Layout';

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

    try {
      this.setState({ isLoading: true });
      const { data } = await axios.post('/api/users', newUser);
      console.log(data);
      this.setState({ isLoading: false });
      Router.pushRoute('/login');
    } catch (err) {
      this.setState({ isLoading: false });
      console.log(err.response);
    }
  };

  render() {
    return (
      <Layout>
        <div>
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Create your account as a voter
              </Header>
              <Form size="large" onSubmit={this.registerUser}>
                <Segment stacked textAlign="left">
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
                    placeholder="enter password"
                    onChange={e =>
                      this.handleChange('password', e.target.value)
                    }
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    disabled={!this.state.isValid}
                    loading={this.state.isLoading}
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                Want to Register as Organizer?{' '}
                <Link href="/register/organizer">
                  <a>Sign Up as Organizer</a>
                </Link>
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
  };
};
export default connect(
  mapStateToprops,
  null
)(VoterRegister);
