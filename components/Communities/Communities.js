import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import Link from 'next/link'

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

class Communities extends React.Component {
  state = {
    communities: [
      {
        id: 1,
        title: 'Community 1',
        location: 'Jakarta'
      },
      {
        id: 2,
        title: 'Community 2',
        location: 'Tangerang'
      },
      {
        id: 3,
        title: 'Community 3',
        location: 'Bekasi'
      },
      {
        id: 4,
        title: 'Community 4',
        location: 'Depok'
      },

    ]
  }
  render() {
    let {communities} = this.state
    return (
      <React.Fragment>
        {communities.map( community => {
          return (

            <Card>
              <Link href='/home/communities'>
                <Card.Content header={community.title} />
              </Link>
              <Card.Content description={community.location} />
              <Card.Content extra>
                <Icon name='user' />
                4 Friends
              </Card.Content>
            </Card>
          )
        })}
      </React.Fragment>
    )
  }
}

export default Communities