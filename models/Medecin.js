const mongoose = require('mongoose');

const MedecinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Optionnellement, vous pouvez ajouter 'unique' si vous voulez empêcher les doublons
  phone: { type: String, required: true },
  service: { type: String, required: true },
  specialization: { type: String, required: true }
});

const Medecin = mongoose.model('Medecin', MedecinSchema);
module.exports = Medecin;
