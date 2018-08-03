import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';

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
import AlertMessage from '../components/AlertMessage/AlertMessage';

class LoginForm extends React.Component {
  state = {
    controls: {
      email: '',
      password: ''
    },
    isValid: false
  };

  checkValidity = () => {
    const controls = { ...this.state.controls };
    let isValid = true;
    isValid = controls.email.trim() !== '' && isValid;
    isValid = controls.password.trim() !== '' && isValid;
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

  loginHandler = async e => {
    e.preventDefault();
    let userData = this.state.controls;
    this.props.onLogin(userData);
  };

  render() {
    return (
      <Layout>
        <Head>
          <title>Psifous | Login</title>
        </Head>
        <div className="login">
          <Grid
            textAlign="center"
            style={{ height: '100%' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" inverted textAlign="center">
                Login To Your Account
              </Header>
              <Form size="large" onSubmit={this.loginHandler}>
                <Segment>
                  <Header
                    as="h2"
                    image="/static/img/logo.png"
                    textAlign="center"
                    content="Psifous"
                    color="teal"
                  />
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    name="email"
                    onChange={(e, { value, name }) =>
                      this.handleChange(name, value)
                    }
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={(e, { value, name }) =>
                      this.handleChange(name, value)
                    }
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={this.props.isLoading}
                    disabled={!this.state.isValid}
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                Not registered yet ?
                <Link route="/register">
                  <a> Register</a>
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
