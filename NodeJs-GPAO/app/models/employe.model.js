module.exports = (sequelize, Sequelize) => {
	const Employe = sequelize.define('employe', {
		nom: {
			type: Sequelize.STRING
		},
		prenom: {
			type: Sequelize.STRING
		},
		poste: {
			type: Sequelize.STRING
		}
	});

	return Employe;
};
