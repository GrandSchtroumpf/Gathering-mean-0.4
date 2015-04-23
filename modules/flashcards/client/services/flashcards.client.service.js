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

/*	Permet de charger toutes les sentences	*/
angular.module('flashcards').factory('allFlashcardsLoader', ['Flashcards', '$q',
    function(Flashcards, $q) {
        return function(){
            var delay = $q.defer();
            Flashcards.query(function(flashcards){
                delay.resolve(flashcards);
            }, function(){
                delay.reject('Pas de phrases trouvés');
            });
            return delay.promise;
        };
    }]);
