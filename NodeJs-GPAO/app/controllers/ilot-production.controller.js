const db = require('../models');
const IlotProduction = db.ilotProduction;
const Op = db.Sequelize.Op;

// Create and Save a new IlotProduction
exports.create = (req, res) => {
	// Validate request
	if (!req.body.nom || !req.body.description) {
		res.status(400).send({
			message: 'Le contenu ne peut pas être vide !'
		});
		return;
	}

	// Create a IlotProduction
	const ilotProduction = {
		nom: req.body.nom,
		description: req.body.description
	};

	// Save IlotProduction in the database
	IlotProduction.create(ilotProduction)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de l'ilot de production."
			});
		});
};

// Retrieve all IlotProductions from the database.
exports.findAll = (req, res) => {
	const nom = req.query.nom;
	var condition = nom ? { nom: { [Op.iLike]: `%${nom}%` } } : null;

	IlotProduction.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des ilots de production."
			});
		});
};

// Find a single IlotProduction with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	IlotProduction.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Une erreur s'est produite lors de la récupération de l'ilot de production avec l'id=" + id
			});
		});
};

// Update a IlotProduction by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	IlotProduction.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'ilot de production a été mis à jour avec succès."
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour l'ilot de production avec l'id=${id}. Il est possible que l'ilot de production ne soit pas trouvé ou que le corps de la requête soit vide!`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de l'ilot de production avec l'id=" + id
			});
		});
};

// Delete a IlotProduction with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	IlotProduction.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'ilot de production a été supprimé avec succès !"
				});
			} else {
				res.send({
					message: `Impossible de supprimer l'ilot de production avec l'id=${id}. Il est possible que l'ilot de production ne soit pas trouvé !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Impossible de supprimer l'ilot de production avec l'id=" + id
			});
		});
};

// Delete all l'ilot de production from the database.
exports.deleteAll = (req, res) => {
	Facture.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} l'ilot de production were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all l ilot de production.'
			});
		});
};
