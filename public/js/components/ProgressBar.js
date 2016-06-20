import React from 'react';
import { ThreeBounce } from 'better-react-spinkit';

export default class Spinningindicator extends React.Component {
  render() {
    return (
      <center>
        <div>
          <ThreeBounce size={30}/>
        </div>
      </center>
    );
  }
}
