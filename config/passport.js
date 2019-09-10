const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
var AccessToken = libRequire('oauth/models/token');

module.exports = function(app) {
    //passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    //falta chequear la fecha de vencimiento
    passport.use('bearer-auth', new BearerStrategy(
        function(token, done) {
            AccessToken.getUser(token)
                .then((token) => {
                    if (token) {
                        return done(null, token.user);
                    }
                    return done(null, false);
                }).catch((err) => {
                    return done(err);
                });
        }
    ));

    passport.use(new BearerStrategy(
        function(token, done) {
            AccessToken.findOne({ accessToken: token })
                .then((token) => {
                    return done(null, token);
                }).catch((err) => {
                    return done(err);
                });
        }
    ));
}