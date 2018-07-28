import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import Link from 'next/link'

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

class Election extends React.Component {
  state = {
    elections: [
      {
        id: 1,
        title: 'Pemilihan Ketua Rt',
        description: 'Pemilihan ketua rt desa manamana'
      },
      {
        id: 2,
        title: 'Ketua Karang Taruna',
        description: 'klorem ipsum dolor sit amet'
      }

    ]
  }
  render() {
    let {elections} = this.state
    return (
      <React.Fragment>
        {elections.map( election => {
          return (

            <Card>
              <Link href='/home/communities/election/'>
                <Card.Content header={election.title} />
              </Link>
              <Card.Content description={election.description} />
              <Card.Content extra>
                <Icon name='user' />
                2 Candidate
              </Card.Content>
            </Card>
          )
        })}
      </React.Fragment>
    )
  }
}

export default Election