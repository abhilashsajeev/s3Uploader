import React from 'react';
import * as Bootstrap from 'react-bootstrap';

var Pagination = Bootstrap.Pagination;

export default class Paginations extends React.Component {
  render() {
    return (
      <div>
        <Pagination
            activePage={this.props.activePage}
            items={this.props.cellCount}
            onSelect={this.handlePaginationSelection}
              />
      </div>
    );
  }
}
