'use strict';

var should = require('should'),
	request = require('supertest'),
	path = require('path'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Flashcard = mongoose.model('Flashcard'),
	express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, flashcard;

/**
 * Flashcard routes tests
 */
describe('Flashcard CRUD tests', function() {
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

		// Save a user to the test db and create new Flashcard
		user.save(function() {
			flashcard = {
				name: 'Flashcard Name'
			};

			done();
		});
	});

	it('should be able to save Flashcard instance if logged in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Flashcard
				agent.post('/api/flashcards')
					.send(flashcard)
					.expect(200)
					.end(function(flashcardSaveErr, flashcardSaveRes) {
						// Handle Flashcard save error
						if (flashcardSaveErr) done(flashcardSaveErr);

						// Get a list of Flashcards
						agent.get('/api/flashcards')
							.end(function(flashcardsGetErr, flashcardsGetRes) {
								// Handle Flashcard save error
								if (flashcardsGetErr) done(flashcardsGetErr);

								// Get Flashcards list
								var flashcards = flashcardsGetRes.body;

								// Set assertions
								(flashcards[0].user._id).should.equal(userId);
								(flashcards[0].name).should.match('Flashcard Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Flashcard instance if not logged in', function(done) {
		agent.post('/api/flashcards')
			.send(flashcard)
			.expect(403)
			.end(function(flashcardSaveErr, flashcardSaveRes) {
				// Call the assertion callback
				done(flashcardSaveErr);
			});
	});

	it('should not be able to save Flashcard instance if no name is provided', function(done) {
		// Invalidate name field
		flashcard.name = '';

		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Flashcard
				agent.post('/api/flashcards')
					.send(flashcard)
					.expect(400)
					.end(function(flashcardSaveErr, flashcardSaveRes) {
						// Set message assertion
						(flashcardSaveRes.body.message).should.match('Please fill Flashcard name');
						
						// Handle Flashcard save error
						done(flashcardSaveErr);
					});
			});
	});

	it('should be able to update Flashcard instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Flashcard
				agent.post('/api/flashcards')
					.send(flashcard)
					.expect(200)
					.end(function(flashcardSaveErr, flashcardSaveRes) {
						// Handle Flashcard save error
						if (flashcardSaveErr) done(flashcardSaveErr);

						// Update Flashcard name
						flashcard.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Flashcard
						agent.put('/api/flashcards/' + flashcardSaveRes.body._id)
							.send(flashcard)
							.expect(200)
							.end(function(flashcardUpdateErr, flashcardUpdateRes) {
								// Handle Flashcard update error
								if (flashcardUpdateErr) done(flashcardUpdateErr);

								// Set assertions
								(flashcardUpdateRes.body._id).should.equal(flashcardSaveRes.body._id);
								(flashcardUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Flashcards if not signed in', function(done) {
		// Create new Flashcard model instance
		var flashcardObj = new Flashcard(flashcard);

		// Save the Flashcard
		flashcardObj.save(function() {
			// Request Flashcards
			request(app).get('/api/flashcards')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Flashcard if not signed in', function(done) {
		// Create new Flashcard model instance
		var flashcardObj = new Flashcard(flashcard);

		// Save the Flashcard
		flashcardObj.save(function() {
			request(app).get('/api/flashcards/' + flashcardObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', flashcard.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Flashcard instance if signed in', function(done) {
		agent.post('/api/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Flashcard
				agent.post('/api/flashcards')
					.send(flashcard)
					.expect(200)
					.end(function(flashcardSaveErr, flashcardSaveRes) {
						// Handle Flashcard save error
						if (flashcardSaveErr) done(flashcardSaveErr);

						// Delete existing Flashcard
						agent.delete('/api/flashcards/' + flashcardSaveRes.body._id)
							.send(flashcard)
							.expect(200)
							.end(function(flashcardDeleteErr, flashcardDeleteRes) {
								// Handle Flashcard error error
								if (flashcardDeleteErr) done(flashcardDeleteErr);

								// Set assertions
								(flashcardDeleteRes.body._id).should.equal(flashcardSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Flashcard instance if not signed in', function(done) {
		// Set Flashcard user 
		flashcard.user = user;

		// Create new Flashcard model instance
		var flashcardObj = new Flashcard(flashcard);

		// Save the Flashcard
		flashcardObj.save(function() {
			// Try deleting Flashcard
			request(app).delete('/api/flashcards/' + flashcardObj._id)
			.expect(403)
			.end(function(flashcardDeleteErr, flashcardDeleteRes) {
				// Set message assertion
				(flashcardDeleteRes.body.message).should.match('User is not authorized');

				// Handle Flashcard error error
				done(flashcardDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Flashcard.remove().exec(function(){
				done();
			});
		});
	});
});
