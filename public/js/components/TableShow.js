import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import $ from 'jquery';
import Alert from './Alert';
var Pagination = Bootstrap.Pagination;
var Glyphicon = Bootstrap.Glyphicon;

export default class TableShow extends React.Component {
  constructor(){
    super();
    this.state = {
      jsonData: [],
      showLodingBar: true,
      alertStyle: 'info',
      alertMessage: 'Data is loading!!!!!!!',
      JumpApi: 0,
      apiNumber: 10,
      activePage: 1,
      cellCount:0,
      indexNumber:0
    };
    this.cellEditProp = {
      mode: 'dbclick',
      blurToSave: false,
      afterSaveCell: this.onAfterSaveCell.bind(this),
      beforeSaveCell: this.onBeforeSaveCell.bind(this)
    };
  }

  componentDidMount() {
    this.loadTable.bind(this)(this.props, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.region === nextProps.region) {
    } else {
      this.setState({
        JumpApi: 0,
        jsonData: [],
        showLodingBar: true,
        alertStyle: 'info',
        alertMessage: 'Loading!!!!!!!',
        activePage:1
      });
      this.loadTable.bind(this)(nextProps, 0);
    }
  }

    loadTable(tableProps, skip){
      var self = this;
      $.ajax({
        url: '/list',
        method: 'GET',
        data: { storedData: tableProps.region, skip: skip, count: self.state.apiNumber },
        dataType: 'json',
        cache: false,
        success: function(data) {
          var arrayIndex = 0;
          var newContents = [];
          var splitCountPagination;
          var indexNo = 0;
          _.forEach(data.data.data, function(item) {
            var downld = 'http://10.4.3.60:4567/seometadata/' +
            (item.sheetListName.replace(/\s/g,'_' )) + '/' +
            (item.category.replace(/\s>\s|>\s/g, '/')) + '/' +
            item.categoryID +
            '.json';
            downld = downld.replace(/\s/g,'_');
            var tmp = <a className='download-link'
                href={downld} >Download</a>;
            item.categoryID = item.categoryID;
            item.category = item.category;
            item.metaTitle = item.metaTitle;
            item.metaDescription = item.metaDescription;
            item.sheetName = item.sheetListName;
            item.arrayIndex = arrayIndex;
            item.id = item._id;
            item.Downloadlink = tmp;
            item.indexNo = arrayIndex + skip;
            newContents.push(item);
            var rowCount = data.data.count;
            indexNo = arrayIndex;
            indexNo = rowCount;
            arrayIndex = arrayIndex + 1;
            splitCountPagination = Math.ceil(rowCount / 10);
          });
          self.setState(
            {
              indexNumber:indexNo,
              cellCount: splitCountPagination,
              jsonData: newContents,
              alertStyle: 'success',
              alertMessage: 'Data loading is successful.',
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
          self.setState(
            {
              alertStyle: 'danger',
              alertMessage: 'Error : ' + err.responseText
            }
          );
        }
      });
    }

  onBeforeSaveCell(row, cellName, cellValue){
    return !(this.state.jsonData[row.arrayIndex][cellName] === cellValue);
  }

  onAfterSaveCell(row, cellName){
    var fieldName = '';
    if (cellName === 'metaTitle') {
      fieldName = 'Meta Title';
    } else {
      fieldName = 'Meta Description';
    }
    row = _.pick(row, ['id', 'metaTitle','metaDescription']);
    this.setState(
      {
        alertStyle: 'info',
        showLodingBar: true,
        alertMessage: fieldName + ' is saving. Please wait'
      }
    );
    var self = this;
    $.ajax({
      url: '/update',
      type: 'POST',
      data: JSON.stringify(row),
      async: true,
      cache: false,
      contentType: 'application/json',
      success: function(result) {
        self.setState(
          {
            alertStyle: 'success',
            showLodingBar: false,
            alertMessage: fieldName + ' Saved successfully.'
          }
        );
        setTimeout(() => {
          self.setState({
            alertStyle: 'info',
            alertMessage: 'Please double click and enter to update'
          });
        }, 4000);
      },
      error: function(err) {
        self.setState(
          {
            alertStyle: 'danger',
            showLodingBar: false,
            alertMessage: 'Error : ' + err.responseText
          }
        );
      }
    });
  }

  onSelect(eventKey) {
    if (!(this.state.activePage === eventKey)) {
      var forward = this.state.apiNumber * (eventKey - 1);
      this.loadTable.bind(this)(this.props, forward);
      this.setState({
        activePage: eventKey
      });
    }
  }

  render() {
    return (
      <div>
        <center className="alligning-center">
          <div className='text-vertical-center'>
            <Alert
                alertMessage={this.state.alertMessage}
                alertStyle={this.state.alertStyle}/>
          </div>
        </center>
        <div className='pagination-left'>
          <Pagination
              activePage={this.state.activePage}
              boundaryLinks
              ellipsis
              first
              items={this.state.cellCount}
              last
              maxButtons={5}
              next
              onSelect={this.onSelect.bind(this)}
              prev
               />
        </div>
        <BootstrapTable
            cellEdit={this.cellEditProp}
            data={this.state.jsonData}
            >
          <TableHeaderColumn dataField="indexNo">#</TableHeaderColumn>
          <TableHeaderColumn
              dataField="categoryID"
              editable={false}
              isKey={true}
              width="120">Category ID</TableHeaderColumn>
          <TableHeaderColumn
              dataField="category"
              editable={false}>Category</TableHeaderColumn>
          <TableHeaderColumn
              dataField="metaTitle">
            <Glyphicon
                glyph="glyphicon glyphicon-pencil" /> Meta Title</TableHeaderColumn>
          <TableHeaderColumn dataField="metaDescription">
            <Glyphicon
                glyph="glyphicon glyphicon-pencil" /> Meta Description</TableHeaderColumn>
          <TableHeaderColumn
              dataField="Downloadlink"
              editable={false}>Download Link</TableHeaderColumn>
        </BootstrapTable>
        <div className = "pagination-right">
          <Pagination
              activePage={this.state.activePage}
              boundaryLinks
              ellipsis
              first
              items={this.state.cellCount}
              last
              maxButtons={5}
              next
              onSelect={this.onSelect.bind(this)}
              prev
                />
        </div>
      </div>
    );
  }
}
