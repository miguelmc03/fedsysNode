var mongoose = require('mongoose');

var AccessTokenScheme = mongoose.Schema({
	accessToken: String,
	accessTokenExpiresAt: Date,
	refreshToken: String,
	refreshTokenExpiresAt: Date,
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	}
});

AccessTokenScheme.index({ "accessTokenExpiresAt": 1 }, { expireAfterSeconds: 0 });

const AccessToken = module.exports = mongoose.model('AccessToken', AccessTokenScheme);

module.exports.getUser = function(token) {
    return AccessToken.findOne({ accessToken: token })
		.populate('user', '-password -__v')
		.exec();
}