module.exports = (sequelize, Sequelize) => {
	const Palette = sequelize.define('palette', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		numero: {
			type: Sequelize.INTEGER
		},
		poids: {
			type: Sequelize.INTEGER
		}
	});

	return Palette;
};
