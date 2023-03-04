module.exports = (app) => {
	const paletteController = require('../controllers/palette.controller');

	// Routes
	app.get('/palettes/', paletteController.findAll);
	app.get('/palettes/:id', paletteController.findOne);
	app.post('/palettes/', paletteController.create);
	app.put('/palettes/:id', paletteController.update);
	app.delete('/palettes/:id', paletteController.delete);
};
