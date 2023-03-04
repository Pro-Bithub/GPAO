const db = require('../models');
const Client = db.Client;

// Create and Save a new Client
exports.create = (req, res) => {
	// Validate request
	if (!req.body.nom) {
		res.status(400).send({
			message: 'Le nom du client ne peut pas être vide !'
		});
		return;
	}

	// Create a Client
	const client = {
		nom: req.body.nom,
		prenom: req.body.prenom,
		adresse: req.body.adresse,
		telephone: req.body.telephone,
		email: req.body.email,
		categorie: req.body.categorie
	};

	// Save Client in the database
	Client.create(client)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création du client."
			});
		});
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
	Client.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des clients."
			});
		});
};

// Find a single Client with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Client.findByPk(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Impossible de trouver le client avec l'id=${id}.`
				});
			} else {
				res.send(data);
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Une erreur s'est produite lors de la récupération du client avec l'id=${id}.`
			});
		});
};

// Update a Client by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Client.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Le client a été mis à jour avec succès.'
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour le client avec l'id=${id}. Il est possible que le client ne soit pas trouvé ou que la requête de mise à jour soit vide.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Une erreur s'est produite lors de la mise à jour du client avec l'id=${id}.`
			});
		});
};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Client.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Le client a été supprimé avec succès !'
				});
			} else {
				res.send({
					message: `Impossible de supprimer le client avec l'id=${id}. Il est possible que le client ne soit pas trouvé.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Une erreur s'est produite lors de la suppression du client avec l'id=${id}.`
			});
		});
};
// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
	Client.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Clients were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all clients.'
			});
		});
};
