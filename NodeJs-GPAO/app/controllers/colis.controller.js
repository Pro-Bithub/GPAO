const db = require('../models');
const Colis = db.Colis;

// Create and Save a new Colis
exports.create = (req, res) => {
	// Validate request
	if (!req.body.numero || !req.body.poids) {
		res.status(400).send({
			message: 'Les champs ne peuvent pas être vides !'
		});
		return;
	}

	// Create a Colis
	const colis = {
		numero: req.body.numero,
		poids: req.body.poids
	};

	// Save Colis in the database
	Colis.create(colis)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de Colis."
			});
		});
};

// Retrieve all Colis from the database.
exports.findAll = (req, res) => {
	Colis.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération de Colis."
			});
		});
};

// Find a single Colis with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Colis.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Erreur lors de la récupération du Colis avec id=' + id
			});
		});
};

// Update a Colis by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Colis.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Colis a été mis à jour avec succès.'
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour le Colis avec l'id=${id}. Il est possible que le Colis ne soit pas trouvé ou que le corps de la requête soit vide !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour du Colis avec l'id=" + id
			});
		});
};

// Delete a Colis with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Colis.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Le Colis a été supprimé avec succès !'
				});
			} else {
				res.send({
					message: `Impossible de supprimer le Colis avec l'id=${id}. Il est possible que le Colis ne soit pas trouvé !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la suppression du Colis avec l'id=" + id
			});
		});
};

// Delete all Colis from the database.
exports.deleteAll = (req, res) => {
	Colis.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Colis were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Colis.'
			});
		});
};
