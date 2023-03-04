module.exports = (sequelize, Sequelize) => {
	const Client = sequelize.define('clients', {
		nom: {
			type: Sequelize.STRING
		},
		prenom: {
			type: Sequelize.STRING
		},
		adresse: {
			type: Sequelize.STRING
		},
		telephone: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		categorie: {
			type: Sequelize.STRING
		}
	});

	return Client;
};
