
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout.js';
import NavBar from './components/NavBar.js';
import ShowAll from './components/ShowAll.js';
import FileUpload from './components/FileUpload.js';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={FileUpload}></IndexRoute>
      <Route path="show-all" component={ShowAll}></Route>
      <Route path="file-upload" component={FileUpload}></Route>
    </Route>
  </Router>
  ,
  app);
