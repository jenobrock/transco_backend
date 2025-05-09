const mongoose = require('mongoose');
const { Schema } = mongoose;
const trajetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  prix: { type: Number, required: true },
  lineNumber: { type: String, },

  stops: [{
    name: { type: String, },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], }
    }
  }],
  distanceKm: { type: Number },

});
const Trajet = mongoose.model('Trajet', trajetSchema);
module.exports = Trajet;
