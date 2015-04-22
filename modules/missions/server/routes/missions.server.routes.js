'use strict';

module.exports = function(app) {
	var missions = require('../controllers/missions.server.controller');
	var missionsPolicy = require('../policies/missions.server.policy');

	// Missions Routes
	app.route('/api/missions').all()
		.get(missions.list).all(missionsPolicy.isAllowed)
		.post(missions.create);

	app.route('/api/missions/:missionId').all(missionsPolicy.isAllowed)
		.get(missions.read)
		.put(missions.update)
		.delete(missions.delete);

	// Finish by binding the Mission middleware
	app.param('missionId', missions.missionByID);
};