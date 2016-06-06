'use strict';

const config = require('./config/config');
const app = require('./config/express')();

app.listen(config.port);

exports = module.exports = app;

console.log(`server started on port ${config.port}`);
