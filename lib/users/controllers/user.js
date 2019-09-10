const User = require('../models');

module.exports.register = function(req, res, next) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role ? req.body.role : 'user'
  });
  
  //deberia arrojar 409 si el 
  //usuario ya esta registrado
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.status(400).send({
        message: "Failed to register user"
      });
    } else {
      res.status(201).send({'user': user});
    }
  });
}

module.exports.readUser = function(req, res, next) {
  User.getById(req.params.id)
    .then((user) => {
      if (user) {
        res.json({'user': user});
      } else {
        res.status(404).send({ 
          message: "No se encontro el usuario." 
        })
      }
    })
    .catch((err) => { next(err) });
}

module.exports.getAllUsers = function(req, res, next) {
  User.find(req.query).select("-password")
    .then((users) => {
      res.json({users: users});
    })
    .catch((err) => { next(err) });
}

module.exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .select("-password")
      .then((user) => {
          res.json({user: user});
      })
      .catch((err) => { next(err) });
}