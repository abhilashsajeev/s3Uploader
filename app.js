'use strict';

const config = require('./config/config');
const app = require('./config/express')(config);

app.listen(config.port);
