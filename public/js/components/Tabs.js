import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import $ from 'jquery';
import Table from './Table';
import Alert from './Alert';

var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;

export default class Tabs extends React.Component {
  constructor(){
    super();
    this.state = {
      regions: [],
      dataCount: 0,
      selectedRegion: 0,
      loadTable: false,
      alertStyle: 'info',
      alertMessage: 'Contents is loading. Please be patient.',
      showAlert: true
    };
  }

  componentDidMount() {
    var self = this;
    $.ajax({
      url: '/list-regions',
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data.data.regions[0]) {
          self.setState(
            {
              regions: data.data.regions,
              dataCount: data.data.totalNumberOfItems,
              selectedRegion: 0,
              loadTable: true,
              showAlert: false
            }
          );
        } else {
          self.setState(
            {
              alertMessage: 'Sorry no data is available',
              alertStyle: 'danger'
            }
          );
        }
      },
      error: function(err) {
        if (err.responseText) {
          self.setState(
            {
              alertMessage: 'Error: ' + err.responseText,
              alertStyle: 'danger'
            }
          );
        } else {
          self.setState(
            {
              alertMessage: 'Error: Please check your network connection',
              alertStyle: 'danger'
            }
          );
        }
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
    const regions = this.state.regions.map(
      (title, i) =>  <NavItem
          eventKey={i}
          key={i}>{title}</NavItem>
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
          ref="regionTab">
        {regions}
      </Nav>
      {this.state.loadTable ?
        <Table dataCount={this.state.dataCount[this.state.regions[this.state.selectedRegion]]}
          region={this.state.regions[this.state.selectedRegion]}/> : null}
        </div>
      );
    }
  }
