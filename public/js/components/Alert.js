import React from 'react';
import * as Bootstrap from 'react-bootstrap';

var Alert = Bootstrap.Alert;

export default class FileEmptyAlert extends React.Component {
  render() {
    return (
      <div>
        <Alert bsStyle={this.props.alertStyle}>
          {this.props.alertMessage}
        </Alert>
      </div>
    );
  }
}
