
const mongoose = require('mongoose');
const { Schema } = mongoose;


const controleurSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String  },
    phone: { type: String }, 
});
const Controleur = mongoose.model('Controleur', controleurSchema);
module.exports = Controleur;
