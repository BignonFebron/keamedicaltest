var jwt = require('jsonwebtoken');
var config = require('../../configuration/configs');

exports.verifyToken = function(req,res){
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization;
        try {
            decoded = jwt.verify(authorization, config.secret);
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
            return decoded.id;
        }
    return res.status(401).send('Define token in authorization header');
    }
    
