const express = require('express');
const passport = require('passport');

const controller = require('../controllers/user');
const rbac = require('../middlewares');

const router = express.Router();

/**
 * @api {post} /user/register Registrar nuevo usuario
 * @apiName Register
 * @apiGroup User
 * @apiVersion 0.1.0
 * 
 * @apiHeader {String=application/json} Content-Type
 * @apiHeader {String} Authorization OAuth 2.0 Grant Type: Client Credentials y Password
 * 
 * @apiParam {String} name Name del usuario.
 * @apiParam {String} email Email del usuario.
 * @apiParam {String=superadmin,admin,moderator,user} [role=user] Rol del usuario.
 * @apiParam {String} password Contraseña del usuario.
 * 
 * @apiParamExample {json} Request-Example:
 *   {
 *    	"name": "User",
 *    	"email": "user@academia.com",
 *    	"password": "12345678"
 *   }
 * 
 * @apiSuccess (Created 201) {Json} user Información del usuario
 */
router.post('/user/register',
    passport.authenticate('bearer', { session: false }),
    rbac.create,
    controller.register
);

/**
 * @api {get} /user/:id Obtener información de usuario
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String=application/json} Content-Type
 * @apiHeader {String} Authorization OAuth 2.0 Grant Type: Password
 * 
 * @apiParam {String} id ID unico del usuario.
 *
 * @apiSuccess {Json} user Objeto usuario
 * @apiSuccess {String} user._id ID unico del usuario.
 * @apiSuccess {String} user.name Name del usuario.
 * @apiSuccess {String} user.email Email del usuario.
 * @apiSuccess {String} user.role Rol del usuario.
 * @apiSuccess {String} user.updatedAt Ultima modificación.
 * @apiSuccess {String} user.createdAt Fecha de creación.
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
 * @apiError (Error 404) NotFound Usuario no encontrado.
 */
router.get('/user/:id',
    passport.authenticate('bearer-auth', { session: false }),
    rbac.read,
    controller.readUser
);

/**
 * @api {get} /users Obtener todos los usuarios
 * @apiName GetAllUsers
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String=application/json} Content-Type
 * @apiHeader {String} Authorization OAuth 2.0 Grant Type: Password
 * 
 * @apiSuccess {Array} users Lista de usuarios
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "users": [
 *             {
 *                 "_id": "5c2a56495f624009d2e89127",
 *                 "name": "User",
 *                 "email": "user@academia.com",
 *                 "role": "user",
 *                 "updatedAt": "2018-12-31T17:47:54.591Z",
 *                 "createdAt": "2018-12-31T17:47:54.591Z"
 *             },
 *             ...
 *         ]
 *     }
 *
 * @apiError (Error 403) Forbidden El usuario no tiene permiso 
 */
router.get('/users',
    passport.authenticate('bearer-auth', { session: false }),
    rbac.read,
    controller.getAllUsers
);

/**
 * @api {patch} /user/:id Actualizar usuario
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 0.1.0
 *
 * @apiHeader {String=application/json} Content-Type
 * @apiHeader {String} Authorization OAuth 2.0 Grant Type: Password
 * 
 * @apiParam {String} [name] Name del usuario.
 * @apiParam {String} [email] Email del usuario.
 * @apiParam {String=superadmin,admin,moderator,user} [role] Rol del usuario.
 * 
 * @apiSuccess {Json} user Información del usuario
 * 
 * @apiError (Error 404) NotFound Usuario no encontrado
 */
router.patch('/user/:id',
    passport.authenticate('bearer-auth', { session: false }),
    rbac.update,
    controller.update
);

module.exports = router;