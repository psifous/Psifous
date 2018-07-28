import React from 'react';
import Head from 'next/head';
import { Container, Button } from 'semantic-ui-react';

import Header from '../Header/Header.js';

export default props => {
  return (
    <React.Fragment>
      <Header />
      <Container>{props.children}</Container>
    </React.Fragment>
  );
};
