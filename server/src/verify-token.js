const jwt = require('jsonwebtoken');
const environment = require('./environment');
const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
    const idToken = req.header('Authorization')
    try {
        if (!idToken) {
            return res.status(401).json('Permission denied')
        }
        admin.auth().verifyIdToken(idToken).then(function (decodedClaims) {
            req.user = decodedClaims
            next();
        }).catch(function (error) {
            res.status(401).send('UNAUTHORIZED REQUEST!');
        });
    } catch (err) {
        return res.status(500).json(err.toString());
    }
};

module.exports = verifyToken;