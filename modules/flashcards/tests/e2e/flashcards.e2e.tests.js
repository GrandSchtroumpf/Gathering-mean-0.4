'use strict';

describe('Flashcards E2E Tests:', function() {
	describe('Test Flashcards page', function() {
		it('Should not include new Flashcards', function() {
			browser.get('http://localhost:3000/#!/flashcards');
			expect(element.all(by.repeater('flashcard in flashcards')).count()).toEqual(0);
		});
	});
});
