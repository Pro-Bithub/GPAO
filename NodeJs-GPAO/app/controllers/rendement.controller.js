const db = require('../models');
const Rendement = db.rendement;

// Create and Save a new Rendement
exports.create = (req, res) => {
	// Validate request
	if (!req.body.quantite || !req.body.date) {
		res.status(400).send({
			message: 'Les champs ne peuvent pas être vides!'
		});
		return;
	}

	// Create a Rendement
	const rendement = {
		quantite: req.body.quantite,
		date: req.body.date
	};

	// Save Rendement in the database
	Rendement.create(rendement)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création du Rendement."
			});
		});
};

// Retrieve all Rendement from the database.
exports.findAll = (req, res) => {
	Rendement.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des Rendements."
			});
		});
};

// Find a single Rendement with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Rendement.findByPk(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: 'Rendement introuvable avec id=' + id
				});
			} else {
				res.send(data);
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Erreur lors de la récupération du Rendement avec id=' + id
			});
		});
};

// Update a Rendement by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Rendement.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Le Rendement a été mis à jour avec succès.'
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour le Rendement avec id=${id}. Il est possible que le Rendement ne soit pas trouvé ou que le corps de la requête soit vide!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Erreur lors de la mise à jour du Rendement avec id=' + id
			});
		});
};

// Delete a Rendement with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Rendement.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Le Rendement a été supprimé avec succès!'
				});
			} else {
				res.send({
					message: `Impossible de supprimer le Rendement avec id=${id}. Il est possible que le Rendement ne soit pas trouvé!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Impossible de supprimer le Rendement avec id=' + id
			});
		});
};

// Delete all Rendement from the database.
exports.deleteAll = (req, res) => {
	Palette.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Rendement were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Rendement.'
			});
		});
};
