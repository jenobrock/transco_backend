const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new mongoose.Schema({
    amount: { type: Number, required: true, unique: true },
    quantity:    { type: Number, required: true },
    bus:      { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
    controler:      { type: mongoose.Schema.Types.ObjectId, ref: 'Chauffeur' },
    trajet:      { type: mongoose.Schema.Types.ObjectId, ref: 'Trajet' },
  },
  {
    timestamps: true,
  }
  
  );
  const Sale = mongoose.model('Sale', SaleSchema);
  module.exports = Sale;
