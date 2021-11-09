const jwt = require('jsonwebtoken')
const environment = require('./environment')

const generateToken = (res, id, uid) => {
    const expiration = environment.testing ? 500000 : 604800000;
    const token = jwt.sign({ id, uid }, environment.JWT_SECRET, {
        expiresIn: environment.testing ? '1d' : '7d',
    });
    return res.cookie('token', token, {
        expires: new Date(Date.now() + expiration),
        secure: true, // set to true if your using https
        httpOnly: true,
    });
};

module.exports = generateToken;