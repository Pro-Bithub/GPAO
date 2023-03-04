module.exports = (sequelize, Sequelize) => {
	const Magasinier = sequelize.define('magasinier', {
		nom: {
			type: Sequelize.STRING
		},
		prenom: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		telephone: {
			type: Sequelize.STRING
		}
	});

	return Magasinier;
};
