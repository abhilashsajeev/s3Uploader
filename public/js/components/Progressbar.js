import React from 'react';
import * as Bootstrap from 'react-bootstrap';

var ProgressBar = Bootstrap.ProgressBar;

export default class ProgressBars extends React.Component {
  render() {
    return (
      <div>
        <ProgressBar
            bsStyle="success"
            key={1}
            now={100}
            striped
              />
      </div>
    );
  }
}
