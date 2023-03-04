# Node.js Rest APIs with Express, Sequelize & MySQL beatboxer 



## Project setup
```
npm install
```

### Run
```
node server.js
```
echo "# NodeJs-GPAO" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Pro-Bithub/NodeJs-GPAO.git
git push -u origin main
 // Importer Sequelize
const { DataTypes } = require('sequelize');
const db = require('./index'); // Importer l'instance Sequelize

// Définir le modèle OrdreFabrication
const OrdreFabrication = db.define('OrdreFabrication', {
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

// Définir les associations avec les autres entités
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

module.exports = OrdreFabrication; */
const db = require('./models'); // Importer les modèles Sequelize

// Créer une nouvelle ordre de fabrication
const newOrder = {
  numero: "OF1234",
  dateDebut: "2023-03-03",
  dateFin: "2023-03-05",
  quantite: 100,
  statut: "En cours",
  idClient: 1 // Id du client associé
};

// Créer la nouvelle ordre de fabrication dans la base de données
db.OrdreFabrication.create(newOrder)
  .then(order => {
    console.log("Nouvelle ordre de fabrication créée :");
    console.log(order.toJSON());
  })
  .catch(error => {
    console.error("Erreur lors de la création de l'ordre de fabrication :", error);
  });
