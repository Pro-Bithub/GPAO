module.exports = (sequelize, Sequelize) => {
	const Notification = sequelize.define('notification', {
		titre: {
			type: Sequelize.STRING
		},
		message: {
			type: Sequelize.STRING
		}
	});

	return Notification;
};
