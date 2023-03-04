const db = require('../models');
const Employe = db.Employe;

// Create and Save a new Employe
exports.create = (req, res) => {
	// Validate request
	if (!req.body.nom || !req.body.prenom || !req.body.poste) {
		res.status(400).send({
			message: 'Le contenu ne peut pas être vide !'
		});
		return;
	}

	// Create a Employe
	const employe = {
		nom: req.body.nom,
		prenom: req.body.prenom,
		poste: req.body.poste
	};

	// Save Employe in the database
	Employe.create(employe)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur est survenue lors de la création de l'employé."
			});
		});
};

// Retrieve all Employes from the database.
exports.findAll = (req, res) => {
	const nom = req.query.nom;
	var condition = nom ? { nom: { [Op.like]: `%${nom}%` } } : null;

	Employe.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Une erreur est survenue lors de la récupération des employés.'
			});
		});
};

// Find a single Employe with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Employe.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la récupération de l'employé avec l'id=" + id
			});
		});
};

// Update a Employe by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Employe.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'employé a été mis à jour avec succès."
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour l'employé avec l'id=${id}. Il est possible que l'employé ne soit pas trouvé ou que la requête body soit vide !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de l'employé avec l'id=" + id
			});
		});
};

// Delete a Employe with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Employe.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'employé a été supprimé avec succès !"
				});
			} else {
				res.send({
					message: `Impossible de supprimer l'employé avec l'id=${id}. Il est possible que l'employé ne soit pas trouvé ou que la requête body soit vide !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la suppression de l'employé avec l'id=" + id
			});
		});
};

// Delete all Employe from the database.
exports.deleteAll = (req, res) => {
	Employe.destroy({
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
