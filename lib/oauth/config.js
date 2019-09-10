var OAuth2Server = require('oauth2-server'),
    Request = OAuth2Server.Request,
    Response = OAuth2Server.Response;

module.exports = function(app) {
    // lifetime = a day
    app.oauth = new OAuth2Server({
        model: require('./helper.js'),
        accessTokenLifetime: 60 * 60 * 24,
        allowBearerTokensInQueryString: true
    });

    /**
     * @api {post} /oauth/token Autenticación
     * @apiName Oauth
     * @apiGroup Oauth
     * @apiVersion 0.1.0
     * @apiDescription Hay dos tipos de autenticación.
     * * password: Genera un access token para un usuario logueado 
     * * client_credentials: Genera un access token 
     * fuera del contexto del usuario. Se usa para consumir
     * la API sin que el usuario esté logueado.
     * 
     * @apiHeader {String=application/json} Content-Type
     * 
     * @apiParam {String=password,client_credentials} grant_type Tipo de autenticación.
     * @apiParam {String} client_id ID del cliente.
     * @apiParam {String} client_secret Clave secreta del cliente.
     * @apiParam {String} [username] Email del usuario.
     *    * Obligatorio cuando grant_type=password
     * @apiParam {String} [password] Contraseña del usuario.
     *    * Obligatorio cuando grant_type=password
     * 
     * @apiParamExample {json} Client Credentials Grant Type:
     *   {
     *   	"grant_type":"client_credentials",
     *   	"client_id":"confidentialacademiaApp",
     *   	"client_secret":"testTopSecret"
     *   }
     * 
     * @apiParamExample {json} Password Grant Type:
     *   {
     *      "username": "user@academia.com",
     *      "password": "12345678",
     *      "grant_type":"password",
     *      "client_id":"confidentialApplication",
     *      "client_secret":"topSecret"
     *   }
     * 
     * @apiSuccessExample Client Credentials Grant Type:
     *     HTTP/1.1 200 OK
     *     {
     *        "accessToken": "c09caad789a8e08f77c39aad5dfd0320594dd1d1",
     *        "accessTokenExpiresAt": "2019-01-12T02:18:03.115Z",
     *        "client": "5c37f5cdbe5b7026fb3cb434",
     *        "user": {
     *            "id": "testConfidentialApp"
     *        }
     *     }
     * 
     * @apiSuccessExample Password Grant Type:
     *     HTTP/1.1 200 OK
     *     {
     *         "accessToken": "1ba69cf52e98b76ec2d5c2b5d4084dc7044021d3",
     *         "accessTokenExpiresAt": "2019-01-12T03:19:27.675Z",
     *         "refreshToken": "5d1a0e52c4d25dddc31b3e6489875ecb74fb8f0a",
     *         "refreshTokenExpiresAt": "2019-01-25T03:19:27.675Z",
     *         "client": "5c37f8c4b9bfb82ade21c5f3",
     *         "user": {
     *             "id": "user@academia.com"
     *         }
     *     }
     * 
     * @apiError (Error 400) BadRequest Mal formado el payload.
     */
    app.all('/oauth/token', obtainToken);

    function obtainToken(req, res) {
        if (req.is('json')) {
            req.headers['content-type'] = 'application/x-www-form-urlencoded';
        }

        var request = new Request(req);
        var response = new Response(res);

        return app.oauth.token(request, response)
            .then(function(token) {
                res.json(token);
            }).catch(function(err) {
                res.status(err.code || 500).json(err);
            });
    }

    /*
    app.get('/', authenticateRequest, function(req, res) {
        res.send('Congratulations, you are in a secret area!');
    });

    function authenticateRequest(req, res, next) {
        var request = new Request(req);
        var response = new Response(res);
        return app.oauth.authenticate(request, response)
            .then(function(token) {
                next();
            }).catch(function(err) {
                res.status(err.code || 500).json(err);
            });
    }  
    */
}