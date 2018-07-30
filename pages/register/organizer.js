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
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    };
    try {
      this.setState({ isLoading: true });
      const { data: community } = await axios.post('/api/communities', {
        name: communityName,
        location: communityLocation,
        AdminId: 0
      });

      const communityId = community.value.id;

      newUser.CommunityId = communityId;

      const { data: admin } = await axios.post('/api/admins', newUser);

      const { data } = await axios.put(`/api/communities/${communityId}`, {
        AdminId: admin.value.id
      });
      this.setState({ isLoading: false });

      Router.pushRoute('/login');
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <Layout>
        <div className="login-form">
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                Create your account as a Organizer
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
                  <Form.Checkbox label="I agree to the Terms and Conditions" />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={this.state.isLoading}
                    disabled={!this.state.isValid}
                  >
                    Register
                  </Button>
                </Segment>
              </Form>
              <Message>
                Want to Register as Voter?{' '}
                <Link route="/register/voter">
                  <a>Sign Up as Voter</a>
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
)(OrganizerRegister);
