const db = require('../models');
const Notification = db.notifications;

// Create and Save a new Notification
exports.create = (req, res) => {
	// Validate request
	if (!req.body.titre || !req.body.message) {
		res.status(400).send({
			message: 'Les champs titre et message ne peuvent pas être vides!'
		});
		return;
	}

	// Create a Notification
	const notification = {
		titre: req.body.titre,
		message: req.body.message
	};

	// Save Notification in the database
	Notification.create(notification)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de la notification."
			});
		});
};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
	Notification.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des notifications."
			});
		});
};

// Find a single Notification with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Notification.findByPk(id)
		.then((data) => {
			if (data) res.send(data);
			else
				res.status(404).send({
					message: "Notification non trouvée avec l'identifiant " + id
				});
		})
		.catch((err) => {
			res.status(500).send({
				message: "Une erreur s'est produite lors de la récupération de la notification avec l'identifiant " + id
			});
		});
};

// Update a Notification by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Notification.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'La notification a été mise à jour avec succès.'
				});
			} else {
				res.status(404).send({
					message: `Impossible de mettre à jour la notification avec l'identifiant ${id}. Notification non trouvée ou corps de la requête vide !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Une erreur s'est produite lors de la mise à jour de la notification avec l'identifiant " + id
			});
		});
};

// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Notification.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'La notification a été supprimée avec succès !'
				});
			} else {
				res.status(404).send({
					message: `Impossible de supprimer la notification avec l'identifiant ${id}. Notification non trouvée !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Une erreur s'est produite lors de la suppression de la notification avec l'identifiant " + id
			});
		});
};

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
	Notification.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Notifications de production were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Notifications.'
			});
		});
};
