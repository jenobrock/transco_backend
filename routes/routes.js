const express = require("express");
const router = express.Router();

var controller = require("../controllers/controller");


//bus
router.post("/bus/create", controller.createBus);
router.get("/bus/list", controller.getBuses);
router.get("/bus/get", controller.getBusById);
router.get("/bus/controler", controller.getBusByControleur);

//chauffeur
router.post("/driver/create", controller.createChauffeur);
router.get("/driver/list", controller.getChauffeurs);
router.get("/driver/get", controller.getChauffeurById);

//trajet
router.post("/ligne/create", controller.createTrajet);
router.get("/ligne/list", controller.getTrajets);
router.get("/ligne/get", controller.getTrajetById);


//controler
router.post("/controler/create", controller.createControleur);
router.get("/controler/list", controller.getControleurs);
router.get("/controler/get", controller.getControleurById);

router.post("/vendre/create", controller.vendre);
router.post("/vendre/multi", controller.vendreSync);
router.get("/vendre/bus", controller.ventePerBus);



router.post("/auth/login", controller.login);

module.exports = router;
