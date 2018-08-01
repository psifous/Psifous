import App, { Container } from 'next/app';
import React from 'react';
import axios from '@/axios';
import { ToastContainer, toast } from 'react-toastify';
import cookies from 'next-cookies';
import { Provider } from 'react-redux';
import { fetchUserData, loadLogin } from '../store/actions/auth/authActions';
import redirectTo from '../lib/redirectTo';
import withReduxStore from '../lib/with-redux-store';
import 'react-toastify/dist/ReactToastify.css';

const nonAuthenticatedPath = [
  '/',
  '/login',
  '/register',
  '/register/organizer',
  '/register/voter'
];

const adminPath = [
  '/dashboard',
  '/dashboard/elections/add',
  '/dashboard/elections/show',
  '/dashboard/elections/show/candidates/add'
];

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    const c = cookies(ctx);
    console.log(ctx.pathname);

    if (typeof c.authtoken !== 'undefined' && c.authtoken !== '') {
      if (JSON.stringify(ctx.reduxStore.getState().auth.userData) === '{}') {
        await ctx.reduxStore.dispatch(fetchUserData(c.authtoken));
      }
    }

    if (Component.getInitialProps) {
      if (typeof c.authtoken !== 'undefined' && c.authtoken !== '') {
        ctx.authtoken = c.authtoken;
        ctx.userData = ctx.reduxStore.getState().auth.userData;
      }
      pageProps = await Component.getInitialProps(ctx);
    }

    if (typeof c.authtoken == 'undefined' || c.authtoken == '') {
      //don't do anything if we are on a page that doesn't require credentials
      if (nonAuthenticatedPath.includes(ctx.pathname)) return { pageProps };
      //if we are on any other page, redirect to the login page
      return redirectTo('/login', { res: ctx.res, status: 301 });
    } else {
      const isAdmin = ctx.reduxStore.getState().auth.isAdmin;
      if (nonAuthenticatedPath.includes(ctx.pathname)) {
        if (isAdmin) {
          redirectTo('/dashboard', { res: ctx.res, status: 301 });
        } else {
          redirectTo('/home', { res: ctx.res, status: 301 });
        }
      } else if (adminPath.includes(ctx.pathname) && !isAdmin) {
        redirectTo('/home', { res: ctx.res, status: 301 });
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <React.Fragment>
            <Component {...pageProps} />
            <ToastContainer />
          </React.Fragment>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
