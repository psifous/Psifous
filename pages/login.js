import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';
import { Link, Router } from '@/routes.js';

import { loginAction } from '@/store/actions/auth/authActions';

import Layout from '@/components/Layout/Layout';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  loginHandle = async e => {
    e.preventDefault();
    let userData = this.state;
    this.props.onLogin(userData);
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
                Log-in to your account
              </Header>
              <Form size="large" onSubmit={this.loginHandle}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={this.handleChange('email')}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange('password')}
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={this.props.isLoading}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us?{' '}
                <Link href="/register">
                  <a>Sign Up</a>
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
    isLoading: state.auth.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(loginAction(user))
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(LoginForm);
