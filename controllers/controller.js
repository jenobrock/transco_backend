const Bus = require('../models/bus');
const Trajet = require('../models/trajets');
const Chauffeur = require('../models/chauffeur');
const Controleur = require('../models/controler');
const bcrypt = require('bcrypt')


const Sale = require('../models/sale');

const vendre = async (req, res) => {
    try {
        const { amount, quantity, bus, controler, trajet } = req.body;
        const sale = new Sale({ amount, quantity, bus, controler, trajet });
        await sale.save();
        res.status(201).json({ message: 'Vente créée avec succès', sale });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Erreur lors de la création de la vente' });
    }
}


const ventePerBus = async (req, res) => {
    try {
        // Récupère le nom physique de la collection 'Bus'
        const busesColl = Bus.collection.collectionName; // généralement 'buses'

        const summary = await Sale.aggregate([
            // 1) Somme des montants et quantités par bus
            {
                $group: {
                    _id: '$bus',
                    totalAmount: { $sum: '$amount' },
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            // 2) Lookup pour joindre les infos du bus
            {
                $lookup: {
                    from: busesColl,
                    localField: '_id',
                    foreignField: '_id',
                    as: 'busInfo'
                }
            },
            // 3) Unwind pour transformer l'array en objet (même si vide)
            {
                $unwind: {
                    path: '$busInfo',
                    preserveNullAndEmptyArrays: true
                }
            },
            // 4) Projection finale : busId, plaque et sommes
            {
                $project: {
                    _id: 0,
                    busId: '$_id',
                    numberPlate: '$busInfo.numberPlate',
                    totalAmount: 1,
                    totalQuantity: 1
                }
            }
        ]);

        return res.json(summary);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}


const vendreSync = async (req, res) => {
    try {
        const salesArray = req.body;

        const inserted = await Sale.insertMany(salesArray, { ordered: true });
        return res.status(201).json(inserted);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Erreur lors de la création de la vente' });
    }
}
const createBus = async (req, res) => {
    try { const bus = new Bus(req.body); res.status(201).json(await bus.save()); }
    catch (err) { res.status(400).json({ error: err.message }); }
};
const getBuses = async (req, res) => {
    try {
        res.json(await Bus.find().populate(['driver', 'controler', 'trajet']))

            ;
    }
    catch (err) { res.status(500).json({ error: err.message }); }
};
const getBusById = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id).populate('driver');
        if (!bus) return res.status(404).json({ error: 'Bus non trouvé' });
        res.json(bus);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

const createChauffeur = async (req, res) => {
    try {
        const c = new Chauffeur(req.body);
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        c.password = await bcrypt.hash(c.password, salt);

        await c.save()
        res.status(201).json({ "message": "Chauffeur créé avec succès", chauffeur: c });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};
const getChauffeurs = async (req, res) => {
    try { res.json(await Chauffeur.find()); }
    catch (err) { res.status(500).json({ error: err.message }); }
};
const getChauffeurById = async (req, res) => {
    try {
        const c = await Chauffeur.findById(req.params.id);
        if (!c) return res.status(404).json({ error: 'Chauffeur non trouvé' });
        res.json(c);
    } catch (err) { res.status(500).json({ error: err.message }); }
};


const createTrajet = async (req, res) => {
    try { const t = new Trajet(req.body); res.status(201).json(await t.save()); }
    catch (err) { res.status(400).json({ error: err.message }); }
};
const getTrajets = async (req, res) => {
    try { res.json(await Trajet.find()); }
    catch (err) { res.status(500).json({ error: err.message }); }
};
const getTrajetById = async (req, res) => {
    try {
        const t = await Trajet.findById(req.params.id).populate('bus');
        if (!t) return res.status(404).json({ error: 'Trajet non trouvé' });
        res.json(t);
    } catch (err) { res.status(500).json({ error: err.message }); }
};


const createControleur = async (req, res) => {
    try { const c = new Controleur(req.body); res.status(201).json(await c.save()); }
    catch (err) { res.status(400).json({ error: err.message }); }
};
const getControleurs = async (req, res) => {
    try { res.json(await Controleur.find().populate('assignedTrips')); }
    catch (err) { res.status(500).json({ error: err.message }); }
};
const getControleurById = async (req, res) => {
    try {
        const c = await Controleur.findById(req.params.id).populate('assignedTrips');
        if (!c) return res.status(404).json({ error: 'Contrôleur non trouvé' });
        res.json(c);
    } catch (err) { res.status(500).json({ error: err.message }); }
};



const login = async (req, res) => {
    //login
    const phone = req.body.phone;
    const pass = req.body.pass;

    Chauffeur.findOne({ phone: phone })
        .then(async (user1) => {
            if (!user1) {
                console.log("User doesn't exist ...");

                return res.status(404).json({ code: "404" });
            }
            bcrypt.compare(pass, user1.password).then(async (data) => {
                if (data) {
                    console.log("User connected");
                    const user2 = await Chauffeur.findById(user1._id);
                    const bus = await Bus.findById({
                        controler: user2._id
                    }).populate('trajet');
                    return res.status(200).json({ code: "200", data: user1, bus: bus });

                } else {
                    console.log("User password wrong ...");

                    return res.status(403).json({ code: "403" });

                }
            });
        }).catch((err) => {
            console.log(err);
        });

}

const getBusByControleur = async (req, res) => {

    try {
        const bus = await Bus.find({ controler: req.query.id }).populate('trajet');
        if (!bus) return res.status(404).json({ error: 'Aucun bus trouvé pour ce contrôleur' });
        res.json(bus);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }}


module.exports = {
    createBus,
    getBuses,
    getBusById,
    createChauffeur,
    getChauffeurs,
    getChauffeurById,
    createTrajet,
    getTrajets,
    getTrajetById,
    createControleur,
    getControleurs,
    getControleurById,
    vendre,
    vendreSync,
    ventePerBus,
    login,
    getBusByControleur


}