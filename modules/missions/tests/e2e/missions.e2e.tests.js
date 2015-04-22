'use strict';

describe('Missions E2E Tests:', function() {
	describe('Test Missions page', function() {
		it('Should not include new Missions', function() {
			browser.get('http://localhost:3000/#!/missions');
			expect(element.all(by.repeater('mission in missions')).count()).toEqual(0);
		});
	});
});
