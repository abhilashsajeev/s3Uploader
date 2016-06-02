import React from 'react';
import * as Bootstrap from 'react-bootstrap';

var Alert = Bootstrap.Alert;

export default class Alerts extends React.Component {
  render() {
    return (
      <div>
        <Alert bsStyle={this.props.alertStyle}><strong>{this.props.alertHeading}</strong>
        {this.props.alertMessage}
      </Alert>
    </div>
  );
}
}
