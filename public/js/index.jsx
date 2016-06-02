import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from "./components/Layout";
import UploadFile from "./components/UploadFile";
import TabBar from "./components/TabBar";

const upload = document.getElementById('upload');
ReactDOM.render(
  <Router history={browserHistory}>
  <Route path="/" component={Layout}>
    <IndexRoute component={UploadFile}></IndexRoute>
    <Route path="UploadFile" component={UploadFile}></Route>
  <Route path="ListFile" component={TabBar}></Route>
  </Route>
  </Router>,
   upload);
