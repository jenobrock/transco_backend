const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new mongoose.Schema({
    ticket: { type: String,  },
    date: { type: String,   },
    amount: { type: Number,  },
    quantity:    { type: Number,  },
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
