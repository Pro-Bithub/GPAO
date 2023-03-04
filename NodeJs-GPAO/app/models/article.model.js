module.exports = (sequelize, Sequelize) => {
	const Article = sequelize.define('article', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
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
