'use strict';

//Flashcards service used to communicate Flashcards REST endpoints
angular.module('flashcards').factory('Sentence', ['$resource',
    function($resource) {
        return $resource('api/sentence/:sentenceId', { sentenceId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

/*	Permet de charger toutes les sentences	*/
angular.module('flashcards').factory('allSentencesLoader', ['Sentence', '$q',
    function(Sentence, $q) {
        return function(){
            var delay = $q.defer();
            Sentence.query(function(sentence){
                delay.resolve(sentence);
            }, function(){
                delay.reject('Pas de phrases trouvés');
            });
            return delay.promise;
        };
    }]);
