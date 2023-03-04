module.exports = (app) => {
	const employeController = require('../controllers/employe.controller');

	// Routes
	app.get('/employes/', employeController.findAll);
	app.get('/employes/:id', employeController.findOne);
	app.post('/employes/', employeController.create);
	app.put('/employes/:id', employeController.update);
	app.delete('/employes/:id', employeController.delete);
};
