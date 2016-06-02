import React from 'react';
import NavigationBar from './NavigationBar';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        {this.props.children}
      </div>
    );
  }
}
