const mongoose = require('mongoose');
const { Schema } = mongoose;
const trajetSchema = new mongoose.Schema({
    title:         { type: String, required: true },
    start:         { type: String, required: true },
    end:           { type: String, required: true },
    prix:           { type: Number, required: true },

  });
  const Trajet = mongoose.model('Trajet', trajetSchema);
  