module.exports = (app) => {
	const colisController = require('../controllers/colis.controller');

	// Routes
	app.get('/colis/', colisController.findAll);
	app.get('/colis/:id', colisController.findOne);
	app.post('/colis/', colisController.create);
	app.put('/colis/:id', colisController.update);
	app.delete('/colis/:id', colisController.delete);
};
