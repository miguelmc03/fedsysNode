var mongoose = require('mongoose');

const ClientScheme = mongoose.Schema({
	clientId: String,
	clientSecret: String,
	grants: [String],
	redirectUris: [String]
});

module.exports = mongoose.model('Client', ClientScheme);