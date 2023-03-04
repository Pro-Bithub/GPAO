const db = require('../models');
const Issue = db.Issue;
const Op = db.Sequelize.Op;

// Create and Save a new Issue
exports.create = (req, res) => {
	// Validate request
	if (!req.body.numero || !req.body.quantite) {
		res.status(400).send({
			message: 'Le contenu ne peut pas être vide !'
		});
		return;
	}

	// Create an Issue
	const Issue = {
		numero: req.body.numero,
		quantite: req.body.quantite
	};

	// Save Issue in the database
	Issue.create(Issue)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur est survenue lors de la création de l'Issue."
			});
		});
};

// Retrieve all Issues from the database.
exports.findAll = (req, res) => {
	const numero = req.query.numero;
	var condition = numero ? { numero: { [Op.like]: `%${numero}%` } } : null;

	Issue.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Une erreur est survenue lors de la récupération des Issues.'
			});
		});
};

// Find a single Issue with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Issue.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la récupération de l'Issue avec l'id=" + id
			});
		});
};

// Update a Issue by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Issue.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'Issue a été mis à jour avec succès."
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour l'Issue avec l'id=${id}. Il est possible que l'Issue ne soit pas trouvé.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de l'Issue avec l'id=" + id
			});
		});
};

// Delete a Issue with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Issue.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'Issue a été supprimé avec succès !"
				});
			} else {
				res.send({
					message: `Impossible de supprimer l'Issue avec l'id=${id}. Il est possible que l'Issue ne soit pas trouvé.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Une erreur s'est l'Issue lors de la suppression du client avec l'id=${id}.`
			});
		});
};
// Delete all l'Issue from the database.
exports.deleteAll = (req, res) => {
	Client.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} l'Issue were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all l Issue.'
			});
		});
};
