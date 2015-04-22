'use strict';

//Flashcards service used to communicate Flashcards REST endpoints
angular.module('flashcards').factory('Flashcards', ['$resource',
	function($resource) {
		return $resource('api/flashcards/:cardId', { flashcardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

