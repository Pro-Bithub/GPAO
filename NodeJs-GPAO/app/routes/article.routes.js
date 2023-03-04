module.exports = (app) => {
	const articleController = require('../controllers/article.controller');

	app.get('/articles/', articleController.findAll);
	app.get('/articles/:id', articleController.findOne);
	app.post('/articles/', articleController.create);
	app.put('/articles/:id', articleController.update);
	app.delete('/articles/:id', articleController.delete);
};
