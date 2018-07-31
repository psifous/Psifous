import React, { Component } from 'react';
import { Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ConfirmationDialog extends Component {
  render() {
    return (
      <div>
        <Confirm
          cancelButton={this.props.cancel || 'Cancel'}
          confirmButton={this.props.confirm || 'Confirm'}
          open={this.props.showConfirmation}
          onCancel={this.props.onCancel}
          onConfirm={this.props.onConfirm}
          content={this.props.content || 'Are you sure ?'}
          size={this.props.size || 'mini'}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showConfirmation: state.ui.showConfirmation
  };
};

export default connect(mapStateToProps)(ConfirmationDialog);
