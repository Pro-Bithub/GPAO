module.exports = (sequelize, Sequelize) => {
	const Rendement = sequelize.define('rendement', {
		quantite: {
			type: Sequelize.INTEGER
		},
		date: {
			type: Sequelize.DATE
		}
	});

	return Rendement;
};
