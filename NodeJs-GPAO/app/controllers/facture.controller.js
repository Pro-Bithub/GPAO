const db = require('../models');
const Facture = db.Facture;

// Create and Save a new Facture
exports.create = (req, res) => {
	// Validate request
	if (!req.body.numero) {
		res.status(400).send({
			message: 'Le numéro de la facture ne peut pas être vide !'
		});
		return;
	}

	// Create a Facture
	const facture = {
		numero: req.body.numero,
		montant: req.body.montant
	};

	// Save Facture in the database
	Facture.create(facture)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de la facture."
			});
		});
};

// Retrieve all Factures from the database.
exports.findAll = (req, res) => {
	Facture.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des factures."
			});
		});
};

// Find a single Facture with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Facture.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la récupération de la facture avec l'id=" + id
			});
		});
};

// Update a Facture by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Facture.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'La facture a été mise à jour avec succès.'
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour la facture avec l'id=${id}. Il est possible que la facture ne soit pas trouvée ou que le corps de la requête soit vide!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de la facture avec l'id=" + id
			});
		});
};

// Delete a Facture with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Facture.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'La facture a été supprimée avec succès !'
				});
			} else {
				res.send({
					message: `Impossible de supprimer la facture avec l'id=${id}. Il est possible que la facture ne soit pas trouvée.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Impossible de supprimer la facture avec l'id=" + id
			});
		});
};

// Delete all Factures from the database.
exports.deleteAll = (req, res) => {
	Facture.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Factures were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Factures.'
			});
		});
};
