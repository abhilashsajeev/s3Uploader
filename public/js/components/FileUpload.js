import React from 'react';
import * as Bootstrap from 'react-bootstrap';
import Alert from './Alert';
import { bindAll } from 'lodash';
import $ from 'jquery';

var FormGroup = Bootstrap.FormGroup;
var FormControl = Bootstrap.FormControl;

export default class FileUpload extends React.Component {
  constructor(){
    super();
    this.state = {
      uploadFileValue: '',
      showEmptyFileAlert: false,
      showSuccessUploadAlert: false,
      showFailUploadAlert: false,
      uploadingProgress: false,
      alertMessage: ''
    };
    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleSubmit(e){
    if (this.state.uploadingProgress) {
      e.preventDefault();
    } else {
      if (this.state.uploadFileValue === '') {
        e.preventDefault();
        this.setState({
          showEmptyFileAlert: true,
          showFailUploadAlert: false,
          showSuccessUploadAlert: false
        });
        setTimeout(() => {
          this.setState({ showEmptyFileAlert: false });
        }, 3000);
      } else {
        e.preventDefault();
        var data = new FormData();
        data.append('file', this.state.filess);
        const _this = this;
        this.setState({
          uploadingProgress: true
        });
        $.ajax({
          url: '/upload-file',
          type: 'POST',
          data: data,
          async: true,
          cache: false,
          contentType: false,
          processData: false,
          success: function(result){
            _this.refs.uploadForm.reset();
            _this.setState({
              uploadFileValue: '',
              showEmptyFileAlert: false,
              uploadingProgress: false
            });
            _this.setState({
              showSuccessUploadAlert: true,
              alertMessage: result.responseMessage
            });
            setTimeout(() => {
              _this.setState({
                showSuccessUploadAlert: false,
                alertMessage: ''
              });
            }, 4000);
          },
          error: function(error){
            _this.refs.uploadForm.reset();
            _this.setState({
              uploadFileValue: '',
              showEmptyFileAlert: false,
              uploadingProgress: false
            });
            if (error.responseText) {
              _this.setState({
                showFailUploadAlert: true,
                alertMessage: 'Error : ' + error.responseText
              });
            } else {
              _this.setState({
                showFailUploadAlert: true,
                alertMessage: 'Error : Please check your network connection'
              });
            }
            setTimeout(() => {

              _this.setState({
                showFailUploadAlert: false,
                alertMessage: ''
              });

            }, 4000);
          }
        });
      }
    }
  }

  handleFile(e) {
    const file = e.target.files[0];
    this.setState({ filess: file });
    this.setState({ uploadFileValue: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="vertical-center-body">
          <h1>Upload your File Here</h1>
          <br/><br/>
          <form action=""
              encType="multipart/form-data"
              method="post"
              onSubmit={this.handleSubmit}
              ref="uploadForm">
            <FormGroup controlId="formControlsFile">
              <FormControl
                  className={this.state.uploadingProgress ? 'btn btn-primary disabled' : 'btn btn-primary'}
                  name="file"
                  onChange={this.handleFile}
                  type="file"
                />
              <br/><br/><br/>
              <FormControl
                  className={this.state.uploadingProgress ? 'btn btn-success disabled' : 'btn btn-success'}
                  type="submit"
                  value={this.state.uploadingProgress ? 'Uploading..' : 'Submit'}
                />
            </FormGroup>
          </form>
          {this.state.showSuccessUploadAlert ?
            <Alert
                alertMessage={this.state.alertMessage}
                alertStyle="success"/> : null}
          {this.state.showFailUploadAlert ?
            <Alert
                alertMessage={this.state.alertMessage}
                alertStyle="danger"/> : null}
          {this.state.showEmptyFileAlert ?
            <Alert
                alertMessage="Please select a valid XLSX/CSV File."
                alertStyle="danger"/> : null}
        </div>
      </div>
    );
  }
}
