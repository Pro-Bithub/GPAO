module.exports = (app) => {
	const factureController = require('../controllers/facture.controller');

	// Routes
	app.post('/factures/', factureController.create);
	app.get('/factures/', factureController.findAll);
	app.get('/factures/:id', factureController.findOne);
	app.put('/factures/:id', factureController.update);
	app.delete('/factures/:id', factureController.delete);
};
