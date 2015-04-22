'use strict';

angular.module('searches').filter('By competence', [
	function() {
		return function(input) {
			// By competence directive logic
			// ...

			return 'By competence filter: ' + input;
		};
	}
]);