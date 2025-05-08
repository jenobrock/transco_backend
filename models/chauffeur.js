const mongoose = require('mongoose');
const { Schema } = mongoose;

const chauffeurSchema = new mongoose.Schema({
    name:          { type: String, required: true },
    licenseNumber: { type: String },
    phone:         { type: String },
    password: { type: String  },
    role: { type: String }, 
  });
  const Chauffeur = mongoose.model('Chauffeur', chauffeurSchema);
  module.exports = Chauffeur;
