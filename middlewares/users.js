const mongoose = require('mongoose');

//create new user

const validateNewUserParams = (req, res, next) => {
    const body = req.body;
    if (body.username && body.phone && body.role) {
        next();
    } else {
        res.send("All required filed must be completed").status(404);
    }
};

const validateId = (req, res, next) => {

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        next()
    } else {
        res.status(404)
    }
}

module.exports = { validateNewUserParams, validateId };
