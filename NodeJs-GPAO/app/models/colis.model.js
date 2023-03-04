module.exports = (sequelize, Sequelize) => {
	const Colis = sequelize.define('colis', {
		numero: {
			type: Sequelize.INTEGER
		},
		poids: {
			type: Sequelize.INTEGER
		}
	});

	return Colis;
};
