require('dotenv-flow').config();

// create a client to mongodb
const config = require('../config/database');
var mongoose = require('mongoose');

/* Connect to the DB */
mongoose.connect(config.database,function(){
    /* Drop the DB */
    mongoose.connection.db.dropDatabase()
        .then(() => { process.exit(); })
        .catch((err) => {
            console.log(err);
        });
});