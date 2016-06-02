import React from 'react';
import $ from 'jquery';
import Alerts from './Alert.js';
import Spinningindicators from './Spinningindicator.js';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFileSelected : false,
      buttonText: 'Upload',
      showSuccessAlert: false,
      showWarningAlert: false,
      showNoNetworkAlert:false,
      showSpin:true,
      data : ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleSubmit(e){
    var data = new FormData();
    data.append('file', this.state.filesUpload);
    e.preventDefault();
    const _this = this;
    this.setState({
      buttonText: 'processing',
      isFileSelected : false,
      showSpin:false
    });
    var self = this;
    $.ajax({
      url: '/uploadfile',
      type: 'POST',
      data: data,
      async: true,
      cache: false,
      contentType: false,
      processData: false,
      success: function(datas){
        var totalPage = datas.data.countOfPage.toString();
        var parsedPageNumber = datas.data.retreived.toString();
        data.retreived = parsedPageNumber;
        data.countOfPage = totalPage;
        self.setState({
          buttonText: 'Upload',
          showSuccessAlert: true,
          showSpin:true,
          data: data
        });
        setTimeout(() => {
          _this.setState({ showSuccessAlert: false });
        }, 4000);
        document.getElementById('myForm').reset();
      },
      error: function(error){
        if (error.statusText === 'error') {
          self.setState({
            buttonText: 'Upload',
            showNoNetworkAlert: true,
            showSpin:true
          });
          setTimeout(() => {
            _this.setState({ showNoNetworkAlert: false });
          }, 4000);
          document.getElementById('myForm').reset();
        } else {
          self.setState({
            buttonText: 'Upload',
            showWarningAlert: true,
            showSpin:true
          });
          setTimeout(() => {
            _this.setState({ showWarningAlert: false });
          }, 4000);
          document.getElementById('myForm').reset();
        }
      }
    });
  }

  handleFile(e) {
    if (e.target.value !== '') {
      const reader = new FileReader();
      const file = e.target.files[0];
      this.setState({
        isFileSelected: true,
        filesUpload: file
      });
    }
  }

  render() {
    var message = `retreived  ${this.state.data.retreived} row out of
    ${this.state.data.countOfPage} from the given file`;
    return (
      <center className="alligning-center">
        <div  className="text-vertical-center">
          <h1>S3 Uploader</h1>
          <h3>Please select Your XLSX file to upload</h3>
          <form
              action=""
              encType="multipart/form-data"
              id="myForm"
              method="post"
              name="myform"
              onSubmit={this.handleSubmit}>
            <div className='fileClass'>
              <input
                  name="file"
                  onChange={this.handleFile}
                  size="60"
                  type="file"
                    />
            </div>
            <div>
              <input
                  className='btn'
                  disabled={!this.state.isFileSelected}
                  name="submit"
                  type="submit"
                  value={this.state.buttonText}
                    />
            </div>
            <div id='temp'>
              {!this.state.showSpin ? <Spinningindicators /> : null}
              {this.state.showSuccessAlert ?
                <Alerts
                    alertMessage={message}
                    alertStyle="success"
                      /> : null}
              {this.state.showNoNetworkAlert ?
                <Alerts
                    alertMessage="Network not available!!!!!"
                    alertStyle="danger"
                      /> : null}
              {this.state.showWarningAlert ?
                <Alerts
                    alertMessage="Something went wrong please select a valid xlsx file"
                    alertStyle="warning"
                      /> : null}
            </div>
          </form>
        </div>
      </center>
    );
  }
}
