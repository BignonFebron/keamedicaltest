const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    telephone: String,
    email: String,
    profession: String,
    password: String
}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);
