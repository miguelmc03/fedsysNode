var clientModel = libRequire('oauth/models/client');

module.exports.loadData = function () {
    var clients = [
		{
			clientId: process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			grants: [
				'password',
				'client_credentials'
			],
			redirectUris: []
		}
    ];

    clients.forEach(element => {
        var client = new clientModel(element);
        client.save();
    });
}