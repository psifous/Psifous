import React from 'react'
import Head from 'next/head'
import { Container } from 'semantic-ui-react'

import Header from '../Header/Header.js'

export default (props) => {
  return (
    <React.Fragment>
      <Head> 
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      </Head>
      <Header/>
      <Container>
        {props.children}
      </Container>
    </React.Fragment>
  )
}