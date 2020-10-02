const mongoose = require('mongoose');
const CandidatureSchema = mongoose.Schema({
    poste: String,
    candidat: String,
    urlCV: String
}, {
    timestamps: true
});
module.exports = mongoose.model('Candidature', CandidatureSchema);