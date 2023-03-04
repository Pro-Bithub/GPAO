module.exports = (sequelize, Sequelize) => {
	const OrdreFabrication = sequelize.define('ordre_fabrication', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		numero: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dateDebut: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		dateFin: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		quantite: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		statut: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return OrdreFabrication;
};
