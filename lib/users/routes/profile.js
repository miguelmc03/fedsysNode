const express = require('express');
const passport = require('passport');

const controller = require('../controllers/profile');

const router = express.Router();

/**
 * @api {get} /user/profile Obtener perfil
 * @apiName GetProfile
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String=application/json} Content-Type
 * @apiHeader {String} Authorization OAuth 2.0 Grant Type: Password
 * 
 * @apiSuccess {Json} user Información del usuario
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "user": {
 *           "_id": "5c2a56495f624009d2e89127",
 *           "name": "User",
 *           "email": "user@academia.com",
 *           "role": "user",
 *           "updatedAt": "2018-12-31T17:47:54.591Z",
 *           "createdAt": "2018-12-31T17:47:54.591Z"
 *        }
 *     }
 * 
 * @apiError (Error 403) Forbidden No tiene permiso para crear un usuario.
 */
router.get('/user/profile',
    passport.authenticate('bearer-auth', { session: false }),
    controller.get
);

/**
 * @api {patch} /user/profile Actualizar perfil
 * @apiName UpdateProfile
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String=application/json} Content-Type
 * @apiHeader {String} Authorization OAuth 2.0 Grant Type: Password
 * 
 * @apiParam {String} [name] Name del usuario.
 * @apiParam {String} [email] Email del usuario.
 * 
 * @apiSuccess {Json} user Información del usuario
 */
router.patch('/user/profile',
    passport.authenticate('bearer-auth', { session: false }),
    controller.update
);

module.exports = router;