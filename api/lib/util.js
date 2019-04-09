'use strict';

var jwt = require('jsonwebtoken');
var Config = require('../../config/config.js');
var Constant = require('../../config/constant.js');
module.exports = {
    ensureAuthorized: ensureAuthorized
}

function ensureAuthorized(req, res ,next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"] || req.query["api_key"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, Config.SECRET, function(err, decoded) {
            req.user = decoded;
            if (err) {
                return res.send({ code: Constant.NOT_FOUND_TOKEN, message: Constant.TOKEN_INVALID });
            }
            next();
        });
    } else {
        return res.send({ code: Constant.NOT_FOUND_TOKEN, message: Constant.TOKEN_NOT_FOUND });
    }
}
