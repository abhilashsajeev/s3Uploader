import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import $ from 'jquery';
import TableShow from './TableShow';
import Alert from './Alert';

var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;

export default class TabBar extends React.Component {

  constructor(){
    super();
    this.state = {
      sheetsName: [],
      selectedRegion: 0,
      loadTable: false,
      alertStyle: 'info',
      alertMessage: 'Loading',
      showAlert: true
    };
  }

  componentDidMount() {
    var self = this;
    $.ajax({
      url: '/list-region',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data.data[0]) {
          self.setState(
            {
              sheetsName: data.data,
              selectedRegion: 0,
              loadTable: true,
              showAlert: false
            }
          );
        } else {
          self.setState(
            {
              alertMessage: 'Ooops No data available!!',
              alertStyle: 'danger'
            }
          );
        }
      },
      error: function(err) {
        self.setState(
          {
            sheetsName: data.data,
            selectedRegion: 0,
            loadTable: true,
            showAlert: false
          }
        );
      }
    });
  }

  handleSelect(selectedKey) {
    this.setState(
      {
        selectedRegion: selectedKey,
      }
    );
  }

  render() {
    const sheetsName = this.state.sheetsName.map(
      (title, i) =>  <NavItem
          eventKey={i}
          key={i} >{title}
    </NavItem>
  );
  return (
    <div>
      {this.state.showAlert ? <Alert
          alertMessage={this.state.alertMessage}
          alertStyle={this.state.alertStyle} /> : null}
      <Nav
          activeKey={this.state.selectedRegion}
          bsStyle="tabs"
          onSelect={this.handleSelect.bind(this)}
          ref="regionTab"
            >
        {sheetsName}
      </Nav>
      {this.state.loadTable ? <TableShow region={this.state.sheetsName[this.state.selectedRegion]}/> : null}
    </div>
  );
}
}
