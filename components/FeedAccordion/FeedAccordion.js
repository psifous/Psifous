import React, { Component } from 'react';
import { Accordion, Menu } from 'semantic-ui-react';
class FeedAccordion extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion as={Menu} vertical fluid>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content="Feed"
            index={0}
            onClick={this.handleClick}
          />
        </Menu.Item>
      </Accordion>
    );
  }
}

export default FeedAccordion;
