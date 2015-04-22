'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Flashcard = mongoose.model('Flashcard');

/**
 * Globals
 */
var user, flashcard;

/**
 * Unit tests
 */
describe('Flashcard Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			flashcard = new Flashcard({
				name: 'Flashcard Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return flashcard.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			flashcard.name = '';

			return flashcard.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Flashcard.remove().exec(function(){
			User.remove().exec(function(){
				done();
			});	
		});
	});
});
