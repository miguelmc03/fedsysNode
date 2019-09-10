const User = require('../models');

module.exports.get = function(req, res) {
    res.json(req.user);
}

module.exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, {new: true})
        .select("-password")
        .then((user) => {
            res.json({user: user});
        })
        .catch((err) => { next(err) });
}