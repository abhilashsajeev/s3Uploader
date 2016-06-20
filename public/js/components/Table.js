import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import $ from 'jquery';
import Alert from './Alert';

var Pagination = Bootstrap.Pagination;

export default class ShowAll extends React.Component {
  constructor(){
    super();
    this.state = {
      activePage: 1,
      showPrevButton: false,
      showNextButton: false,
      jsonData: [],
      showLodingBar: true,
      alertStyle: 'info',
      alertMessage: 'Data is loading. Please wait.',
      skipApi: 0,
      limitApi: 10
    };
    this.cellEditProp = {
      mode: 'dbclick',
      blurToSave: false,
      afterSaveCell: this.onAfterSaveCell.bind(this),
      beforeSaveCell: this.onBeforeSaveCell.bind(this)
    };
  }

  componentDidMount() {
    this.loadTableData.bind(this)(this.props, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.region === nextProps.region) {
      // Do nothing.
    } else {
      this.setState({
        activePage: 1,
        showPrevButton: false,
        showNextButton: false,
        skipApi: 0,
        jsonData: [],
        showLodingBar: true,
        alertStyle: 'info',
        alertMessage: 'Data is loading. Please wait.'
      });
      this.loadTableData.bind(this)(nextProps, 0);
    }
  }

  loadTableData(tableProps, skip){
    this.setState({
      alertStyle: 'info',
      alertMessage: 'Data is loading. Please wait.'
    });
    var self = this;
    $.ajax({
      url: '/list-all',
      method: 'GET',
      data: { regionId: tableProps.region, skip: skip, limit: this.state.limitApi },
      dataType: 'json',
      cache: false,
      success: function(data) {
        var arrayIndex = 0;
        var newData = [];
        _.forEach(data.data, function(item) {
          var filePath = 'http://10.4.3.58:4567/my_bucket/JSON_Files/' +
            item.sheetName.trim() + '/' + item.category.trim().replace(/\s>\s/g, '/');
          var jsonFilePath = filePath + '/' + item.categoryID + '.json';
          jsonFilePath = jsonFilePath.replace(/\s/g, '_');
          item.download_link = <a href={jsonFilePath}>Download</a>;
          item.originalId = item._id;
          item.itemNumber = skip + arrayIndex + 1;
          item.arrayIndex = arrayIndex;
          arrayIndex = arrayIndex + 1;
          newData.push(item);
        });
        var showNext = true;
        if (data.data.length < self.state.limitApi) {
          showNext = false;
        } else {
          showNext = true;
        }
        self.setState(
          {
            jsonData: newData,
            showNextButton: showNext,
            alertStyle: 'info',
            alertMessage: 'Please double click on field to edit'
          }
        );
      },
      error: function(err) {
        console.error(status, err.toString());
        if (err.responseText) {
          self.setState(
            {
              alertStyle: 'danger',
              alertMessage: 'Error : ' + err.responseText
            }
          );
        } else {
          self.setState(
            {
              alertStyle: 'danger',
              alertMessage: 'Error : Please check your internet connection'
            }
          );
        }
      }
    });
  }

  onBeforeSaveCell(row, cellName, cellValue){
    return !(this.state.jsonData[row.arrayIndex][cellName] === cellValue);
  }

  onAfterSaveCell(row, cellName, cellValue){
    var newObj = _.pick(row, ['metaTitle', 'metaDescription', '_id']);
    var fieldName = '';
    if (cellName === 'metaTitle') {
      fieldName = 'Meta Title';
    } else {
      fieldName = 'Meta Description';
    }
    this.setState(
      {
        alertStyle: 'info',
        showLodingBar: true,
        alertMessage: fieldName + ' is saving. Please wait'
      }
    );
    var self = this;
    $.ajax({
      url: '/update-data',
      type: 'POST',
      data: JSON.stringify(newObj),
      async: true,
      cache: false,
      contentType: 'application/json',
      success: function(result){
        self.setState(
          {
            alertStyle: 'success',
            showLodingBar: false,
            alertMessage: result.responseMessage
          }
        );
        setTimeout(() => {
          self.setState({
            alertStyle: 'info',
            alertMessage: 'Please double click on field to edit'
          });
        }, 4000);
      },
      error: function(err) {
        console.error(status, err.toString());
        if (err.responseText) {
          self.setState(
            {
              alertStyle: 'danger',
              showLodingBar: false,
              alertMessage: 'Error : ' + err.responseText
            }
          );
        } else {
          self.setState(
            {
              alertStyle: 'danger',
              showLodingBar: false,
              alertMessage: 'Error : Please check yout network connection'
            }
          );
        }
      }
    });
  }

  handleSelect(selectedKey) {
    if (this.state.activePage === selectedKey) {
      //Do nothing.
    } else {
      var skip1 = this.state.limitApi * (selectedKey - 1);
      this.loadTableData.bind(this)(this.props, skip1);

      this.setState({
        activePage: selectedKey
      });
    }
  }

  render() {
    return (
      <div>
        <Alert
            alertMessage={this.state.alertMessage}
            alertStyle={this.state.alertStyle}/>
        <Pagination
            activePage={this.state.activePage}
            boundaryLinks
            ellipsis
            first = "First Page"
            items = {Math.ceil(this.props.dataCount / this.state.limitApi)}
            last = "Last Page"
            maxButtons={5}
            next = "Next Page"
            onSelect={this.handleSelect.bind(this)}
            prev = "Previous Page"/>
        <br/>
        <BootstrapTable
            cellEdit={this.cellEditProp}
            data={this.state.jsonData}>
          <TableHeaderColumn
              dataField="itemNumber"
              editable={false}>{'#'}</TableHeaderColumn>
          <TableHeaderColumn
              dataField="categoryID"
              editable={false}
              isKey={true}>Category ID</TableHeaderColumn>
          <TableHeaderColumn
              dataField="category"
              editable={false}>Category</TableHeaderColumn>
          <TableHeaderColumn
              dataField="metaTitle">Meta Title</TableHeaderColumn>
          <TableHeaderColumn
              dataField="metaDescription">Meta Description</TableHeaderColumn>
          <TableHeaderColumn
              dataField="download_link"
              editable={false}>Download Link</TableHeaderColumn>
        </BootstrapTable>
        <Pagination
            activePage={this.state.activePage}
            boundaryLinks
            ellipsis
            first = "First Page"
            items = {Math.ceil(this.props.dataCount / this.state.limitApi)}
            last = "Last Page"
            maxButtons={5}
            next = "Next Page"
            onSelect={this.handleSelect.bind(this)}
            prev = "Previous Page"/>
      </div>
    );
  }
}
