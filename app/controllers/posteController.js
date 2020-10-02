// importations
const Poste = require('../models/poste.js');
// Create many posts
exports.createManyPosts = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Definir les champs"
        });
    }
    // for each element create poste
    req.body.forEach(element => {
        poste = new Poste({
        libelle: element.libelle,
        description: element.description,
        nombreanneeExperience: element.nombreanneeExperience,
        diplome:element.diplome,
        nombrePlaceDisponible: element.nombrePlaceDisponible,
        dateExpiration: element.dateExpiration
    });
    // Save Poste in the database
    poste.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "ERREUR SERVEUR"
        });
    });
    });
};

// Retrieve and return all postes.
exports.getAllPostes = (req, res) => {
    Poste.find({}, {'libelle': true,'description':true,'createdAt':true,'dateExpiration':true,'_id':false})
    .then(postes => {
        res.send(postes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving postes."
        });
    });
};