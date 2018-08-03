import React, { Component } from 'react';
import { Segment, Header, Accordion, Menu } from 'semantic-ui-react';
import VoterItem from './../VoterItem/VoterItem';
class VotersList extends Component {
  state = { activeIndex: 1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { activeIndex } = this.state;

    const votersList = (
      <Segment.Group style={{ overflow: 'auto', maxHeight: 200 }}>
        {this.props.voters.map(user => <VoterItem key={user.id} user={user} />)}
      </Segment.Group>
    );
    return (
      <React.Fragment>
        <Segment>
          <Header as="h4">Voters Count : {this.props.totalVoters}</Header>
        </Segment>
        <Accordion as={Menu} vertical fluid>
          <Menu.Item>
            <Accordion.Title
              active={activeIndex === 0}
              content="Voters List"
              index={0}
              onClick={this.handleClick}
            />
            <Accordion.Content
              active={activeIndex === 0}
              content={votersList}
            />
          </Menu.Item>
        </Accordion>
      </React.Fragment>
    );
  }
}

export default VotersList;
