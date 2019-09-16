require('dotenv-flow').config();

global.configRequire = name => require(`${__dirname}/config/${name}`);
global.libRequire = name => require(`${__dirname}/lib/${name}`);
global.srcRequire = name => require(`${__dirname}/src/${name}`);

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const uuidv4 = require('uuid/v4');
const path = require('path');
const cors = require('cors');

const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');

const mongoose = require('mongoose');

const app = express();

// [START] ** DATABASE **

const config = configRequire('database');
//connect to database
mongoose.connect(config.database, { useNewUrlParser: true });
//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database' + config.database)
});
//on error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
});

// [END] ** DATABASE **

// app.use(express.static(__dirname + '/public/dist/fedsys'));
app.use('/public/image', express.static(__dirname + '/public/image'));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parse incoming requests data
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//cors middleware
app.use(cors());

// config PASSPORT
configRequire('passport')(app);

// Config modules
libRequire('config')(app);


// Configuracion graph
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

// app.get('/*', (req, res, next) => {
//     console.log('vista de angular');
//     res.sendFile(path.join(__dirname, 'public', 'dist', 'fedsys', 'index.html'));
// });

//port number
const PORT = process.env.PORT;
//start server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

const server = http.createServer(app);
