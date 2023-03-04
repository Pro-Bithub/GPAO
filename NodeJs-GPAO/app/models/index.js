const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
//const fs = require('fs');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importer les modèles de tables
db.Client = require('./client.model.js')(sequelize, Sequelize);
db.Employe = require('./employe.model.js')(sequelize, Sequelize);
db.Article = require('./article.model.js')(sequelize, Sequelize);
db.IlotProduction = require('./ilot-production.model.js')(sequelize, Sequelize);
db.OrdreFabrication = require('./ordre-fabrication.model.js')(sequelize, Sequelize);
db.Notification = require('./notification.model.js')(sequelize, Sequelize);
db.Palette = require('./palette.model.js')(sequelize, Sequelize);
db.Colis = require('./colis.model.js')(sequelize, Sequelize);
db.Facture = require('./facture.model.js')(sequelize, Sequelize);
db.Rendement = require('./rendement.model.js')(sequelize, Sequelize);
db.Magasinier = require('./magasinier.model.js')(sequelize, Sequelize);
// Associer les tables selon les relations
db.Client.hasMany(db.OrdreFabrication, { as: 'ordresFabrication' });
db.OrdreFabrication.belongsTo(db.Client, {
	foreignKey: 'idClient',
	as: 'client'
});

db.Employe.hasMany(db.OrdreFabrication, { as: 'ordresFabrication' });
db.OrdreFabrication.belongsTo(db.Employe, {
	foreignKey: 'idEmploye',
	as: 'employe'
});

db.IlotProduction.hasMany(db.OrdreFabrication, { as: 'ordresFabrication' });
db.OrdreFabrication.belongsTo(db.IlotProduction, {
	foreignKey: 'idIlotProduction',
	as: 'ilotProduction'
});

db.Article.belongsTo(db.Magasinier, { foreignKey: 'idMagasinier', as: 'magasinier' });
db.Magasinier.hasMany(db.Article, { as: 'articles' });

db.Colis.belongsTo(db.Article, { foreignKey: 'idArticle', as: 'article' });
db.Article.hasMany(db.Colis, { as: 'colis' });

db.Palette.belongsTo(db.Article, { foreignKey: 'idArticle', as: 'article' });
db.Article.hasMany(db.Palette, { as: 'palettes' });

db.Notification.belongsTo(db.OrdreFabrication, { foreignKey: 'idOrdreFabrication', as: 'ordreFabrication' });
db.OrdreFabrication.hasMany(db.Notification, { as: 'notifications' });

db.Facture.belongsTo(db.Client, { foreignKey: 'idClient', as: 'client' });
db.Client.hasMany(db.Facture, { as: 'factures' });

db.Rendement.belongsTo(db.IlotProduction, { foreignKey: 'idIlotProduction', as: 'ilotProduction' });
db.IlotProduction.hasMany(db.Rendement, { as: 'rendements' });

module.exports = db;

/* {
"dateDebut": "2023-03-03 08:00:00",
"dateFin": "2023-03-04 16:00:00",
"quantite": 100,
"idClient": 1,
"client": {
"nom": "Dupont",
"prenom": "Jean",
"adresse": "123 rue des Lilas",
"telephone": "0123456789",
"email": "jean.dupont@example.com",
"categorie": "professionnel"
},
"idEmploye": 2,
"employe": {
"nom": "Martin",
"prenom": "Pierre",
"poste": "responsable production"
},
"idIlotProduction": 3,
"ilotProduction": {
"nom": "Ilot 3",
"description": "Ilot de production de pièces mécaniques"
},
"articles": [
{
"reference": "ART001",
"designation": "Vis M4x10",
"prixUnitaire": 0.1,
"quantiteStock": 1000,
"idMagasinier": 4,
"magasinier": {
"nom": "Leclerc",
"prenom": "Philippe",
"poste": "magasinier"
},
"colis": [
{
"reference": "COL001",
"quantite": 100,
"dateArrivee": "2023-03-01",
"idArticle": 1
}
],
"palettes": [
{
"reference": "PAL001",
"quantite": 1000,
"dateArrivee": "2023-02-01",
"idArticle": 1
}
]
}
],
"notifications": [
{
"message": "L'ordre de fabrication a été créé",
"type": "information"
}
]
}

/ Créer une nouvelle ordre de fabrication
const newOrder = {
  numero: "OF1234",
  dateDebut: "2023-03-03",
  dateFin: "2023-03-05",
  quantite: 100,
  statut: "En cours",
  idClient: 1 // Id du client associé
};
*/
