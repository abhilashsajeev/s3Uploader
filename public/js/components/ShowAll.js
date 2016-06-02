import React from 'react';
import Tabs from './Tabs';

export default class ShowAll extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Contents</h1>
        </div>
        <div className="vertical-center-show-all">
          <Tabs/>
        </div>
      </div>
    );
  }
}
