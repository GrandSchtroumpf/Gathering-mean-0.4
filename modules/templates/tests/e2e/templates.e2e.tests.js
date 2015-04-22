'use strict';

describe('Templates E2E Tests:', function() {
	describe('Test Templates page', function() {
		it('Should not include new Templates', function() {
			browser.get('http://localhost:3000/#!/templates');
			expect(element.all(by.repeater('template in templates')).count()).toEqual(0);
		});
	});
});
