import React from 'react'
import { Message } from 'semantic-ui-react'

const AlertMessage = (props) => (
  <Message color={props.color}>
    <Message.Header>{props.content}</Message.Header>
  </Message>
)

export default AlertMessage