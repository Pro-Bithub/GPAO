const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
	origin: 'http://localhost:4200'
};

global.__basedir = __dirname;

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');

// Import des modèles
/* const Client = db.Client;
const Employe = db.Employe;
const Article = db.Article;
const IlotProduction = db.IlotProduction;
const OrdreFabrication = db.OrdreFabrication;
const Notification = db.Notification;
const Palette = db.Palette;
const Colis = db.Colis;
const Facture = db.Facture;
const Rendement = db.Rendement; */

// Synchronisation de la base de données
db.sequelize
	.sync()
	.then(() => {
		console.log('La base de données a été synchronisée avec succès.');
	})
	.catch((err) => {
		console.error('Erreur lors de la synchronisation de la base de données :', err);
	});

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to beatboxer platforme  application by Hazem Lassoued.' });
});
app.use('/resources/static/assets/uploads/img/profil', express.static('./resources/static/assets/uploads/img/profil'));

// Utilisation des modèles dans l'application Express
require('./app/routes/client.routes')(app);
require('./app/routes/employe.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/ilot-production.routes')(app);
require('./app/routes/ordre-fabrication.routes.js')(app);
require('./app/routes/notification.routes')(app);
require('./app/routes/palette.routes')(app);
require('./app/routes/colis.routes')(app);
require('./app/routes/facture.routes')(app);
require('./app/routes/rendement.routes')(app);
/*  app.use('/employes', );
app.use('/articles', );
app.use('/ilots-production', );
app.use('/ordres-fabrication', );
app.use('/notifications', );
app.use('/palettes', );
app.use('/colis', );
app.use('/factures',);
app.use('/rendements', );  */

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
