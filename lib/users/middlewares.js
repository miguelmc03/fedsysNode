/**
 * @file 
 * Middleware de autorizacion.
 * Revisa que el usuario tenga permisos
 * para realizar cierta acción.
 *
 * @author Andrea Centeno <andreacent8@gmailcom>
 */

const rbac = require('easy-rbac').create(libRequire('users/roles'));
const User = require('./models');

var canCreate = (req, res, next) => {    
    //grant-type client credentials
    //usuario registrandose
    if (req.user.user == null) {
        req.body.role = 'user'
        return next()
    } 

    //grant-type password
    //usuario con permiso de crear
    //otro usuario
    User.findById(req.user.user)
        .then((user) => {
            if (user) {
                return rbac.can(user.role, 'user:create')                
            }
            res.status(404).send({ 
                message: "User not found" 
            })
        })
        .then((result) => {
            if (res.finished) return

            if (result) return next()
              
            res.status(403).send({ 
                message: "No tiene permiso." 
            })
        })
        .catch((err) => { return next(err) });
}

var can = (permission) => {
    return (req, res, next) => {
        rbac.can(req.user.role, permission)
            .then(result => {
                if (result) {
                    next()
                } else {
                    res.status(403);
                    res.json({ message: "No tiene permisos." })
                }
            })
            .catch((err) => {
                res.status(500);
                res.json({ message: err.message })
            });
    }
};

module.exports = {
    create: canCreate,
    read: can('user:read'),
    update: can('user:update')
}