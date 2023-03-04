module.exports = (sequelize, Sequelize) => {
	const IlotProduction = sequelize.define('ilot_production', {
		nom: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		}
	});

	return IlotProduction;
};
