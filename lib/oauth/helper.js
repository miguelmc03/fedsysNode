/*
 * Usado como ejemplo https://github.com/pedroetb/node-oauth2-server-example
 */
var mongoose = require('mongoose');

/**
 * Configuration.
 */
var clientModel = require('./models/client'),
    tokenModel = require('./models/token'),
    userModel = libRequire('users/models');

/*
 * Methods used by all grant types.
 */
var getAccessToken = function(token) {
    return tokenModel.findOne({
        accessToken: token
    });
};

var getClient = function(clientId, clientSecret) {
    return clientModel.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    });
};

var saveToken = function(token, client, user) {
    token.client = client.id;

    var tokenInstance = new tokenModel(token);
    if (!user.clientId) {
        tokenInstance.user = user.id;
    }
    tokenInstance.save();

    token.user = {
        id: user.email || user.clientId
    };
    return token;
};

/*
 * Method used only by password grant type.
 */
var getUser = function(username, password) {
    const bcrypt = require('bcryptjs');
    return userModel.findOne({ email: username })
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            }
        }).catch((err) => {
            throw err;
        });
};

/*
 * Method used only by client_credentials grant type.
 */
var getUserFromClient = function(client) {
    return clientModel.findOne({
        clientId: client.clientId,
        clientSecret: client.clientSecret,
        grants: 'client_credentials'
    });
};

/**
 * Export model definition object.
 */
module.exports = {
    getAccessToken: getAccessToken,
    getClient: getClient,
    saveToken: saveToken,
    getUser: getUser,
    getUserFromClient: getUserFromClient
};