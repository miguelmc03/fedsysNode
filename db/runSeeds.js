require('dotenv-flow').config();

const mongoose = require('mongoose');
const config = require('../config/database');

global.libRequire = name => require(`${__dirname}/../lib/${name}`);
global.srcRequire = name => require(`${__dirname}/../src/${name}`);
global.rhmedicalRequire = name => require(`${__dirname}/../rhmedical/${name}`);

/* Connect to the DB */
mongoose.connect(config.database, function() {
    require('./seeds/oauth').loadData();
    require('./seeds/users').loadData();
});