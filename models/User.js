const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {  type: String, required: true, unique: true },
    email: {  type: String, required: true, unique: true },
    password: {  type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);

// Exportation du modèle sous le nom "User"

module.exports = UserModel;