module.exports = (app) => {
	const rendementController = require('../controllers/rendement.controller');

	app.post('/rendements/', rendementController.create);
	app.get('/rendements/', rendementController.findAll);
	app.get('/rendements/:id', rendementController.findOne);
	app.put('/rendements/:id', rendementController.update);
	app.delete('/rendements/:id', rendementController.delete);
};
