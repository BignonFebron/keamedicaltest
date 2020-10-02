// importations
const Candidat = require('../models/candidat.js');
const Candidature = require('../models/candidature.js');
var verifyjwt = require('../security/jwt.js');

var toreturn =[]

// Link candidat to a poste
exports.createNewCandidateure = (req, res) => {
    userId = verifyjwt.verifyToken(req, res);
    if (!req.body) {
        return res.status(400).send({
            message: "Definir les champs"
        });
    }
    // values affectations
    candidature = new Candidature({
        poste: req.body.posteId,
        candidat: userId,
        urlCV: req.body.urlCV,
    });
    // Save in the database
    candidature.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "ERREUR SERVEUR"
            });
        });
};

//retrieve candidate which candidate for a poste
exports.getByPoste = (req,res) => {
    // token cheking
    verifyjwt.verifyToken(req, res);
    Candidature.find({ "poste": req.query.posteId })
        .then(candidatures => {
            candidatures.forEach(element => {
                Candidat.findById(element.candidat, function (err, candidat) {
                    toreturn.push({"nom":candidat.nom,"prenom":candidat.prenom,
                    "telephone":candidat.telephone,"urlCV":element.urlCV})

                    res.send(toreturn);
                });
               
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving postes."
            });
        });
};