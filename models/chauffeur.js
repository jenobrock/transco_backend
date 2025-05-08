const mongoose = require('mongoose');
const { Schema } = mongoose;

const chauffeurSchema = new mongoose.Schema({
    name:          { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    phone:         { type: String }
  });
  const Chauffeur = mongoose.model('Chauffeur', chauffeurSchema);
  