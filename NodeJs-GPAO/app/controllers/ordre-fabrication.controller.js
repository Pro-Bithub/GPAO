const db = require('../models');
const OrdreFabrication = db.ordreFabrication;
const Op = db.Sequelize.Op;

// Create and Save a new OrdreFabrication
exports.create = (req, res) => {
	// Validate request
	if (!req.body.numero || !req.body.quantite) {
		res.status(400).send({
			message: 'Le contenu ne peut pas être vide !'
		});
		return;
	}

	// Create an OrdreFabrication
	const ordreFabrication = {
		numero: req.body.numero,
		quantite: req.body.quantite
	};

	// Save OrdreFabrication in the database
	OrdreFabrication.create(ordreFabrication)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur est survenue lors de la création de l'OrdreFabrication."
			});
		});
};

// Retrieve all OrdreFabrications from the database.
exports.findAll = (req, res) => {
	const numero = req.query.numero;
	var condition = numero ? { numero: { [Op.like]: `%${numero}%` } } : null;

	OrdreFabrication.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Une erreur est survenue lors de la récupération des OrdreFabrications.'
			});
		});
};

// Find a single OrdreFabrication with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	OrdreFabrication.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la récupération de l'OrdreFabrication avec l'id=" + id
			});
		});
};

// Update a OrdreFabrication by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	OrdreFabrication.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'OrdreFabrication a été mis à jour avec succès."
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour l'OrdreFabrication avec l'id=${id}. Il est possible que l'OrdreFabrication ne soit pas trouvé.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de l'OrdreFabrication avec l'id=" + id
			});
		});
};

// Delete a OrdreFabrication with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	OrdreFabrication.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'OrdreFabrication a été supprimé avec succès !"
				});
			} else {
				res.send({
					message: `Impossible de supprimer l'OrdreFabrication avec l'id=${id}. Il est possible que l'OrdreFabrication ne soit pas trouvé.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Une erreur s'est l'OrdreFabrication lors de la suppression du client avec l'id=${id}.`
			});
		});
};
// Delete all l'OrdreFabrication from the database.
exports.deleteAll = (req, res) => {
	Client.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} l'OrdreFabrication were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all l OrdreFabrication.'
			});
		});
};
