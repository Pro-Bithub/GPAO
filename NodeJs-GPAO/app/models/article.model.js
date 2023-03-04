module.exports = (sequelize, Sequelize) => {
	const Article = sequelize.define('article', {
		reference: {
			type: Sequelize.STRING
		},
		designation: {
			type: Sequelize.STRING
		},
		stock: {
			type: Sequelize.INTEGER
		}
	});

	return Article;
};
