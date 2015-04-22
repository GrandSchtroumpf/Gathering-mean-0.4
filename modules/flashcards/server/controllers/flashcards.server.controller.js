'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Flashcard = mongoose.model('Flashcard'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Flashcard
 */
exports.create = function(req, res) {
	var flashcard = new Flashcard(req.body);
	flashcard.user = req.user;

	flashcard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(flashcard);
		}
	});
};

/**
 * Show the current Flashcard
 */
exports.read = function(req, res) {
	res.jsonp(req.flashcard);
};

/**
 * Update a Flashcard
 */
exports.update = function(req, res) {
	var flashcard = req.flashcard ;

	flashcard = _.extend(flashcard , req.body);

	flashcard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(flashcard);
		}
	});
};

/**
 * Delete an Flashcard
 */
exports.delete = function(req, res) {
	var flashcard = req.flashcard ;

	flashcard.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(flashcard);
		}
	});
};

/**
 * List of Flashcards
 */
exports.list = function(req, res) { Flashcard.find().sort('-created').populate('user', 'displayName').exec(function(err, flashcards) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(flashcards);
		}
	});
};

/**
 * Flashcard middleware
 */
exports.flashcardByID = function(req, res, next, id) { Flashcard.findById(id).populate('user', 'displayName').exec(function(err, flashcard) {
		if (err) return next(err);
		if (! flashcard) return next(new Error('Failed to load Flashcard ' + id));
		req.flashcard = flashcard ;
		next();
	});
};