import React, { Component } from 'react';
import { Icon, Header } from 'semantic-ui-react';

class EmptyMessage extends Component {
  render() {
    console.log('hit');
    return (
      <React.Fragment>
        <div
          className="empty-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <div>
            <div>
              <Icon
                name={this.props.icon || 'clone outline'}
                size={this.props.size || 'huge'}
                inverted={this.props.inverted}
                color={this.props.color || 'black'}
              />
            </div>
            <Header
              as="h2"
              content={this.props.text || 'Empty'}
              color={this.props.color || 'black'}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     showConfirmation: state.ui.showConfirmation
//   };
// };

export default EmptyMessage;
