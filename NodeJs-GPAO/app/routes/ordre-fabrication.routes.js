module.exports = (app) => {
	const ordreFabricationController = require('../controllers/ordre-fabrication.controller');

	// Routes
	app.get('/ordres-fabrication/', ordreFabricationController.findAll);
	app.get('/ordres-fabrication/:id', ordreFabricationController.findOne);
	app.post('/ordres-fabrication/', ordreFabricationController.create);
	app.put('/ordres-fabrication/:id', ordreFabricationController.update);
	app.delete('/ordres-fabrication/:id', ordreFabricationController.delete);
};
