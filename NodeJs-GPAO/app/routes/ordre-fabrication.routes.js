module.exports = (app) => {
	const IssueController = require('../controllers/ordre-fabrication.controller');

	// Routes
	app.get('/ordres-fabrication/', IssueController.findAll);
	app.get('/ordres-fabrication/:id', IssueController.findOne);
	app.post('/ordres-fabrication/', IssueController.create);
	app.put('/ordres-fabrication/:id', IssueController.update);
	app.delete('/ordres-fabrication/:id', IssueController.delete);
};
