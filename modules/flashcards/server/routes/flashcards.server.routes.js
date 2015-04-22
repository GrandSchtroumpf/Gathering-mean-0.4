'use strict';

module.exports = function(app) {
	var flashcards = require('../controllers/flashcards.server.controller');
	var flashcardsPolicy = require('../policies/flashcards.server.policy');

	// Flashcards Routes
	app.route('/api/flashcards').all()
		.get(flashcards.list).all(flashcardsPolicy.isAllowed)
		.post(flashcards.create);

	app.route('/api/flashcards/:flashcardId').all(flashcardsPolicy.isAllowed)
		.get(flashcards.read)
		.put(flashcards.update)
		.delete(flashcards.delete);

	// Finish by binding the Flashcard middleware
	app.param('flashcardId', flashcards.flashcardByID);

var sentence = require('../controllers/sentence.server.controller');

    // Flashcards Routes
    app.route('/api/sentence').all()
        .get(sentence.list)
        .post(sentence.create);

    app.route('/api/sentence/:sentenceId')
        .get(sentence.read)
        .put(sentence.update)
        .delete(sentence.delete);

    // Finish by binding the Flashcard middleware
    app.param('sentenceId', sentence.sentenceByID);
};
