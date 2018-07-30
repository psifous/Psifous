import App, { Container } from 'next/app';
import React from 'react';
import axios from 'axios';
import cookies from 'next-cookies';
import { Provider } from 'react-redux';

import redirectTo from '../lib/redirectTo';
import withReduxStore from '../lib/with-redux-store';

const freePath = [
  '/',
  '/login',
  '/register',
  '/register/organizer',
  '/register/voter'
];

const adminPath = ['/dashboard'];

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    let response;
    const c = cookies(ctx);
    console.log(ctx.pathname);
    if (Component.getInitialProps && c.authtoken) {
      if (typeof c.authtoken !== 'undefined') {
        ctx.authtoken = c.authtoken;
      }
      pageProps = await Component.getInitialProps(ctx);
    }
    //if the authtoken is not found
    if (typeof c.authtoken == 'undefined') {
      //don't do anything if we are on a page that doesn't require credentials
      if (freePath.includes(ctx.pathname)) return { ...pageProps };
      //if we are on any other page, redirect to the login page
      else redirectTo('/login', { res: ctx.res, status: 301 });
    }
    //if we do have an auth token to check
    else {
      response = await axios
        .post('/api/verify', {
          token: c.authtoken
        })
        .then(({ data }) => {
          if (freePath.includes(ctx.pathname)) {
            //if auth check was successful, send to dashboard
            if (data.result == 'success') {
              console.log(data.isAdmin);
              if (data.isAdmin) {
                console.log('hit');
                redirectTo('/dashboard', { res: ctx.res, status: 301 });
              } else {
                console.log('hit');
                redirectTo('/home', { res: ctx.res, status: 301 });
              }
            } else {
              //setting the cookie to expire way back when removes it
              document.cookie =
                'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              redirectTo('/login', { res: ctx.res, status: 301 });
            }
          } else if (ctx.pathname == '/login') {
            //shouldn't show the login page is we are already logged in
            if (data.result == 'success') {
              redirectTo('/dashboard', { res: ctx.res, status: 301 });
            }

            //if it wasn't successful, stay where we are
            else
              return {
                ...pageProps,
                ...{ query: ctx.query, authtoken: c.authtoken }
              };
          }

          //any other page that requires a login
          else {
            //if auth check was successful, stay where we are
            if (resp.result == 'success')
              return {
                ...pageProps,
                ...{ query: ctx.query, authtoken: c.authtoken }
              };
            //if it wasn't successful, clear the authtoken since it must be expired or invalid and redirect to login
            else {
              document.cookie =
                'authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
              redirectTo('/login', { res: ctx.res, status: 301 });
            }
          }
        })
        .catch(err => {
          return { ...pageProps };
        });
    }
    if (response !== null) {
      return { response };
    } else return { ...pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...this.props.response} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
