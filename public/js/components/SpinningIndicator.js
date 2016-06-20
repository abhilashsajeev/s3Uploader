import React from 'react';
import { Circle } from 'better-react-spinkit';

export default class Spinningindicator extends React.Component {
  render() {
    return (
      <center>
        <div>
          <Circle size={100}/>
        </div>
      </center>
    );
  }
}
