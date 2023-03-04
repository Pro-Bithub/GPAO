const db = require('../models');
const Article = db.Article;

// Create and save a new Article
exports.create = (req, res) => {
	// Validate request
	if (!req.body.reference) {
		res.status(400).send({
			message: 'La référence ne peut pas être vide !'
		});
		return;
	}

	// Create an Article
	const article = {
		reference: req.body.reference,
		designation: req.body.designation,
		stock: req.body.stock
	};

	// Save Article in the database
	Article.create(article)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la création de l'article."
			});
		});
};

// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
	Article.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Une erreur s'est produite lors de la récupération des articles."
			});
		});
};

// Find a single Article with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Article.findByPk(id)
		.then((data) => {
			if (!data) res.status(404).send({ message: "L'article avec l'id " + id + " n'a pas été trouvé." });
			else res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la récupération de l'article avec l'id " + id
			});
		});
};

// Update an Article by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Article.update(req.body, {
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'article a été mis à jour avec succès."
				});
			} else {
				res.send({
					message: `Impossible de mettre à jour l'article avec l'id=${id}. Il est possible que l'article ne soit pas trouvé ou que le corps de la requête soit vide !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Erreur lors de la mise à jour de l'article avec l'id " + id
			});
		});
};

// Delete an Article with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Article.destroy({
		where: { id: id }
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "L'article a été supprimé avec succès !"
				});
			} else {
				res.send({
					message: `Impossible de supprimer l'article avec l'id=${id}. Il est possible que l'article ne soit pas trouvé !`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Impossible de supprimer l'article avec l'id " + id
			});
		});
};

// Delete all Articles from the database.
exports.deleteAll = (req, res) => {
	Article.destroy({
		where: {},
		truncate: false
	})
		.then((nums) => {
			res.send({ message: `${nums} Articles were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while removing all Articles.'
			});
		});
};
