const db = require('../models');
const Palette = db.palettes;
const Op = db.Sequelize.Op;

// Create and Save a new Palette
exports.create = (req, res) => {
	// Validate request
	if (!req.body.numero || !req.body.poids) {
		res.status(400).send({
			message: 'Le contenu ne peut pas être vide !'
		});
		return;
	}

	// Create a Palette
	const palette = {
		numero: req.body.numero,
		poids: req.body.poids
	};

	// Save Palette in the database
	Palette.create(palette)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Une erreur est survenue lors de la création de la palette.'
			});
		});
};

// Retrieve all Palettes from the database.
exports.findAll = (req, res) => {
	const numero = req.query.numero;
	var condition = numero ? { numero: { [Op.like]: `%${numero}%` } } : null;

	Palette.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Une erreur est survenue lors de la récupération des palettes.'
			});
		});
};

// Find a single Palette with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Palette.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la récupération de la palette avec l'id=" + id
			});
		});
};

// Update a Palette by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Palette.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'La palette a été mise à jour avec succès.'
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour la palette avec l'id=${id}. Il est possible que la palette ne soit pas trouvée ou que la requête était vide !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de la palette avec l'id=" + id
			});
		});
};

// Delete a Palette with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Palette.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'La palette a été supprimée avec succès !'
				});
			} else {
				res.send({
					message: `Impossible de supprimer la palette avec l'id=${id}. Il est possible que la palette ne soit pas trouvée.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Impossible de supprimer la palette avec l'id=" + id
			});
		});
};

// Delete all Palettes from the database.
exports.deleteAll = (req, res) => {
	Palette.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Palettes were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Palettes.'
			});
		});
};
