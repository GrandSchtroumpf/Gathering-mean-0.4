'use strict';

module.exports = function(app) {
	var templates = require('../controllers/templates.server.controller');
	var templatesPolicy = require('../policies/templates.server.policy');

	// Templates Routes
	app.route('/api/templates').all()
		.get(templates.list).all(templatesPolicy.isAllowed)
		.post(templates.create);

	app.route('/api/templates/:templateId').all(templatesPolicy.isAllowed)
		.get(templates.read)
		.put(templates.update)
		.delete(templates.delete);

	// Finish by binding the Template middleware
	app.param('templateId', templates.templateByID);
};