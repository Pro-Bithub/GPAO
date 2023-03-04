module.exports = (app) => {
	const ilotProductionController = require('../controllers/ilot-production.controller');

	// Routes
	app.get('/ilots-production/', ilotProductionController.findAll);
	app.get('/ilots-production/:id', ilotProductionController.findOne);
	app.post('/ilots-production/', ilotProductionController.create);
	app.put('/ilots-production/:id', ilotProductionController.update);
	app.delete('/ilots-production/:id', ilotProductionController.delete);
};
