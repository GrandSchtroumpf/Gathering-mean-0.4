'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Template = mongoose.model('Template'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, template;

/**
 * Template routes tests
 */
describe('Template CRUD tests', function() {
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

		// Save a user to the test db and create new Template
		user.save(function() {
			template = {
				name: 'Template Name'
			};

			done();
		});
	});

	it('should be able to save Template instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Template
				agent.post('/api/templates')
					.send(template)
					.expect(200)
					.end(function(templateSaveErr, templateSaveRes) {
						// Handle Template save error
						if (templateSaveErr) done(templateSaveErr);

						// Get a list of Templates
						agent.get('/api/templates')
							.end(function(templatesGetErr, templatesGetRes) {
								// Handle Template save error
								if (templatesGetErr) done(templatesGetErr);

								// Get Templates list
								var templates = templatesGetRes.body;

								// Set assertions
								(templates[0].user._id).should.equal(userId);
								(templates[0].name).should.match('Template Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Template instance if not logged in', function(done) {
		agent.post('/api/templates')
			.send(template)
			.expect(403)
			.end(function(templateSaveErr, templateSaveRes) {
				// Call the assertion callback
				done(templateSaveErr);
			});
	});

	it('should not be able to save Template instance if no name is provided', function(done) {
		// Invalidate name field
		template.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Template
				agent.post('/api/templates')
					.send(template)
					.expect(400)
					.end(function(templateSaveErr, templateSaveRes) {
						// Set message assertion
						(templateSaveRes.body.message).should.match('Please fill Template name');
						
						// Handle Template save error
						done(templateSaveErr);
					});
			});
	});

	it('should be able to update Template instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Template
				agent.post('/api/templates')
					.send(template)
					.expect(200)
					.end(function(templateSaveErr, templateSaveRes) {
						// Handle Template save error
						if (templateSaveErr) done(templateSaveErr);

						// Update Template name
						template.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Template
						agent.put('/api/templates/' + templateSaveRes.body._id)
							.send(template)
							.expect(200)
							.end(function(templateUpdateErr, templateUpdateRes) {
								// Handle Template update error
								if (templateUpdateErr) done(templateUpdateErr);

								// Set assertions
								(templateUpdateRes.body._id).should.equal(templateSaveRes.body._id);
								(templateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Templates if not signed in', function(done) {
		// Create new Template model instance
		var templateObj = new Template(template);

		// Save the Template
		templateObj.save(function() {
			// Request Templates
			request(app).get('/api/templates')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Template if not signed in', function(done) {
		// Create new Template model instance
		var templateObj = new Template(template);

		// Save the Template
		templateObj.save(function() {
			request(app).get('/api/templates/' + templateObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', template.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Template instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Template
				agent.post('/api/templates')
					.send(template)
					.expect(200)
					.end(function(templateSaveErr, templateSaveRes) {
						// Handle Template save error
						if (templateSaveErr) done(templateSaveErr);

						// Delete existing Template
						agent.delete('/api/templates/' + templateSaveRes.body._id)
							.send(template)
							.expect(200)
							.end(function(templateDeleteErr, templateDeleteRes) {
								// Handle Template error error
								if (templateDeleteErr) done(templateDeleteErr);

								// Set assertions
								(templateDeleteRes.body._id).should.equal(templateSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Template instance if not signed in', function(done) {
		// Set Template user 
		template.user = user;

		// Create new Template model instance
		var templateObj = new Template(template);

		// Save the Template
		templateObj.save(function() {
			// Try deleting Template
			request(app).delete('/api/templates/' + templateObj._id)
			.expect(403)
			.end(function(templateDeleteErr, templateDeleteRes) {
				// Set message assertion
				(templateDeleteRes.body.message).should.match('User is not authorized');

				// Handle Template error error
				done(templateDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Template.remove().exec(function(){
				done();
			});
		});
	});
});
