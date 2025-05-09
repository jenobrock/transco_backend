const mongoose = require('mongoose');
const { Schema } = mongoose;

const chauffeurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },

  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F', 'Autre'] },
  address:         { type: String },

  licenseNumber: { type: String },
  password: { type: String },
  role: { type: String },
});
const Chauffeur = mongoose.model('Chauffeur', chauffeurSchema);
module.exports = Chauffeur;
