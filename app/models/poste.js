const mongoose = require('mongoose');
const PosteSchema = mongoose.Schema({
    libelle: String,
    description: String,
    nombreanneeExperience: Number,
    diplome:String,
    nombrePlaceDisponible: Number,
    dateExpiration: Date
}, {
    timestamps: true
});
module.exports = mongoose.model('Poste', PosteSchema);