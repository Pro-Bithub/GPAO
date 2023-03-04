module.exports = (sequelize, Sequelize) => {
	const Facture = sequelize.define('facture', {
		numero: {
			type: Sequelize.INTEGER
		},
		montant: {
			type: Sequelize.INTEGER
		}
	});

	return Facture;
};
