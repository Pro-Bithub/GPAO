module.exports = (app) => {
	const notificationController = require('../controllers/notification.controller');

	// Routes
	app.get('/notifications/', notificationController.findAll);
	app.get('/notifications/:id', notificationController.findOne);
	app.post('/notifications/', notificationController.create);
	app.put('/notifications/:id', notificationController.update);
	app.delete('/notifications/:id', notificationController.delete);
};
