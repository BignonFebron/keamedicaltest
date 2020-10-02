// importations
const Candidat = require('../models/candidat.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../configuration/configs');
var verifyjwt = require('../security/jwt.js');


// Create account for a candidat
exports.createCandidateAccount = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Definir les champs"
        });
    }
    // hach password and create account
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        // values affections
    candidat = new Candidat({
        nom: req.body.nom,
        prenom: req.body.prenom,
        telephone: req.body.telephone,
        email: req.body.email,
        profession: req.body.profession,
        password: hash
    });
    // Save Poste in the database
    candidat.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "ERREUR SERVEUR"
        });
    });  
      });  
};

//login with telephone and password.
exports.login= (req, res) =>  {
    Candidat.findOne({ telephone: req.body.telephone }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          return res.status(401).send({ auth: false, token: null });
        } else {
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token });
        }
      })
    });
}

// Delete a candidat specifing id
exports.deleteCandidat = (req, res) => {
    verifyjwt.verifyToken(req,res);
    Candidat.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        /*return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });*/
    });
}
