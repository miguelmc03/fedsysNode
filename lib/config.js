const express = require('express');

module.exports = function(app) {
    // OAUTH2
    require('./oauth/config')(app);

    // Profile
    app.use(require('./users/routes/profile'));

    // USER
    app.use(require('./users/routes/user'));
}