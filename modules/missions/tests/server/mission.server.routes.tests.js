'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Mission = mongoose.model('Mission'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, mission;

/**
 * Mission routes tests
 */
describe('Mission CRUD tests', function() {
	before(function(done) {
		// Get application
		app = express.init(mongoose);
		agent = request.agent(app);

		done();
	});

	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Mission
		user.save(function() {
			mission = {
				name: 'Mission Name'
			};

			done();
		});
	});

	it('should be able to save Mission instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mission
				agent.post('/api/missions')
					.send(mission)
					.expect(200)
					.end(function(missionSaveErr, missionSaveRes) {
						// Handle Mission save error
						if (missionSaveErr) done(missionSaveErr);

						// Get a list of Missions
						agent.get('/api/missions')
							.end(function(missionsGetErr, missionsGetRes) {
								// Handle Mission save error
								if (missionsGetErr) done(missionsGetErr);

								// Get Missions list
								var missions = missionsGetRes.body;

								// Set assertions
								(missions[0].user._id).should.equal(userId);
								(missions[0].name).should.match('Mission Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Mission instance if not logged in', function(done) {
		agent.post('/api/missions')
			.send(mission)
			.expect(403)
			.end(function(missionSaveErr, missionSaveRes) {
				// Call the assertion callback
				done(missionSaveErr);
			});
	});

	it('should not be able to save Mission instance if no name is provided', function(done) {
		// Invalidate name field
		mission.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mission
				agent.post('/api/missions')
					.send(mission)
					.expect(400)
					.end(function(missionSaveErr, missionSaveRes) {
						// Set message assertion
						(missionSaveRes.body.message).should.match('Please fill Mission name');
						
						// Handle Mission save error
						done(missionSaveErr);
					});
			});
	});

	it('should be able to update Mission instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mission
				agent.post('/api/missions')
					.send(mission)
					.expect(200)
					.end(function(missionSaveErr, missionSaveRes) {
						// Handle Mission save error
						if (missionSaveErr) done(missionSaveErr);

						// Update Mission name
						mission.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Mission
						agent.put('/api/missions/' + missionSaveRes.body._id)
							.send(mission)
							.expect(200)
							.end(function(missionUpdateErr, missionUpdateRes) {
								// Handle Mission update error
								if (missionUpdateErr) done(missionUpdateErr);

								// Set assertions
								(missionUpdateRes.body._id).should.equal(missionSaveRes.body._id);
								(missionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Missions if not signed in', function(done) {
		// Create new Mission model instance
		var missionObj = new Mission(mission);

		// Save the Mission
		missionObj.save(function() {
			// Request Missions
			request(app).get('/api/missions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Mission if not signed in', function(done) {
		// Create new Mission model instance
		var missionObj = new Mission(mission);

		// Save the Mission
		missionObj.save(function() {
			request(app).get('/api/missions/' + missionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', mission.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Mission instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Mission
				agent.post('/api/missions')
					.send(mission)
					.expect(200)
					.end(function(missionSaveErr, missionSaveRes) {
						// Handle Mission save error
						if (missionSaveErr) done(missionSaveErr);

						// Delete existing Mission
						agent.delete('/api/missions/' + missionSaveRes.body._id)
							.send(mission)
							.expect(200)
							.end(function(missionDeleteErr, missionDeleteRes) {
								// Handle Mission error error
								if (missionDeleteErr) done(missionDeleteErr);

								// Set assertions
								(missionDeleteRes.body._id).should.equal(missionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Mission instance if not signed in', function(done) {
		// Set Mission user 
		mission.user = user;

		// Create new Mission model instance
		var missionObj = new Mission(mission);

		// Save the Mission
		missionObj.save(function() {
			// Try deleting Mission
			request(app).delete('/api/missions/' + missionObj._id)
			.expect(403)
			.end(function(missionDeleteErr, missionDeleteRes) {
				// Set message assertion
				(missionDeleteRes.body.message).should.match('User is not authorized');

				// Handle Mission error error
				done(missionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Mission.remove().exec(function(){
				done();
			});
		});
	});
});
