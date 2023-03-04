module.exports = (app) => {
	const clientController = require('../controllers/client.controller');

	app.get('/client/', clientController.findAll);
	app.get('/client/:id', clientController.findOne);
	app.post('/client/', clientController.create);
	app.put('/client/:id', clientController.update);
	app.delete('/client/:id', clientController.delete);
};
