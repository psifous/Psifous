import App, { Container } from 'next/app';
import React from 'react';
import axios from '@/axios';
import initializeStrore from '../store/configureStore';
import cookies from 'next-cookies';
import { Provider } from 'react-redux';
import { fetchUserData, loadLogin } from '../store/actions/auth/authActions';
import redirectTo from '../lib/redirectTo';
import withReduxStore from '../lib/with-redux-store';

const nonAuthenticatedPath = [
  '/',
  '/login',
  '/register',
  '/register/organizer',
  '/register/voter'
];

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    const c = cookies(ctx);
    console.log(ctx.pathname);
    if (Component.getInitialProps) {
      if (typeof c.authtoken !== 'undefined' && c.authtoken !== '') {
        ctx.authtoken = c.authtoken;
      }
      pageProps = await Component.getInitialProps(ctx);
    }

    if (typeof c.authtoken !== 'undefined' && c.authtoken !== '') {
      if (JSON.stringify(ctx.reduxStore.getState().auth.userData) === '{}') {
        await ctx.reduxStore.dispatch(fetchUserData(c.authtoken));
      }
    }

    if (typeof c.authtoken == 'undefined') {
      //don't do anything if we are on a page that doesn't require credentials
      if (nonAuthenticatedPath.includes(ctx.pathname)) return { pageProps };
      //if we are on any other page, redirect to the login page
      return redirectTo('/login', { res: ctx.res, status: 301 });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
