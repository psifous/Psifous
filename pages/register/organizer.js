import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

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

import Layout from '@/components/Layout/Layout';

import { registerOrganizer } from '@/store/actions/auth/authActions';

class OrganizerRegister extends React.Component {
  state = {
    controls: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      communityName: '',
      communityLocation: ''
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
    event.preventDefault();
    let {
      firstName,
      lastName,
      email,
      password,
      communityName,
      communityLocation
    } = this.state.controls;
    const adminData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };

    const communityData = { communityName, communityLocation };
    this.props.onRegister(adminData, communityData);
  };

  render() {
    return (
      <Layout>
        <Head>
          <title>Psifous | Register as Organizer</title>
        </Head>
        <div className="login-form">
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" inverted textAlign="center">
                Create Your Account As a Organizer
              </Header>
              <Form size="large" onSubmit={this.registerUser}>
                <Segment stacked textAlign="left">
                  <Header as="h2" color="teal" textAlign="center">
                    Organizer
                  </Header>
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
                  <Form.Field
                    control={Input}
                    label="Community Name"
                    placeholder="Community Name"
                    onChange={e =>
                      this.handleChange('communityName', e.target.value)
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Community location"
                    placeholder="Comunity Location"
                    onChange={e =>
                      this.handleChange('communityLocation', e.target.value)
                    }
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={this.props.isLoading}
                    disabled={!this.state.isValid}
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                Want to Register as Voter?{' '}
                <Link route="/register/voter">
                  <a>Register as Voter</a>
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
    isLogin: state.auth.isLogin,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (adminData, communityData) =>
      dispatch(registerOrganizer(adminData, communityData))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(OrganizerRegister);
