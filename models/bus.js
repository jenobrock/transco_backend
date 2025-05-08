const mongoose = require('mongoose');
const { Schema } = mongoose;

const busSchema = new mongoose.Schema({
    numberPlate: { type: String, required: true, unique: true },
    capacity:    { type: Number, required: true },
    driver:      { type: mongoose.Schema.Types.ObjectId, ref: 'Chauffeur' },
  });
  const Bus = mongoose.model('Bus', busSchema);
  