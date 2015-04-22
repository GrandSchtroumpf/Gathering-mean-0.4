'use strict';

//Setting up route
angular.module('flashcards').config(['$stateProvider',
	function($stateProvider) {
		// Flashcards state routing
		$stateProvider.
		state('flashcards', {
			abstract: true,
			url: '/flashcards',
            controller: 'FlashcardsController',
            templateUrl: 'modules/flashcards/views/management/management-flashcards.client.view.html',
            resolve : {sentences : function (allSentencesLoader) {return allSentencesLoader();}}
		}).
		state('flashcards.list', {
			url: '',
			templateUrl: 'modules/flashcards/views/management/list-flashcards.client.view.html'
		}).
		state('flashcards.create', {
			url: '/create',
			templateUrl: 'modules/flashcards/views/management/create-flashcard.client.view.html'
		}).

        state('thisFlashcard', {
            abstract: true,
            url: '/flashcards',
            template: '<ui-view/>',
            controller: 'ThisFlashcardController',
            resolve : {thisFlashcard: ['Flashcards', '$stateParams', '$q',
            function(Flashcards, $stateParams, $q) {
                var delay = $q.defer();
                Flashcards.get({flashcardId: $stateParams.flashcardId},
                    function(flashcard) {delay.resolve(flashcard);},
                    function() {delay.reject('flashcard non trouve : ' + $stateParams.flashcardId);});
                {return delay.promise;}	//A la fin on retourne le résultat
            }]
        }
        }).
		state('thisFlashcard.view', {
			url: '/:cardId',
			templateUrl: 'modules/flashcards/views/management/view-flashcard.client.view.html'
		}).
		state('thisFlashcard.edit', {
			url: '/:cardId/edit',
			templateUrl: 'modules/flashcards/views/management/edit-flashcard.client.view.html'
		});

	}
]);
