'use strict';

// Flashcards controller
angular.module('flashcards').controller('FlashcardsController', ['$scope', '$stateParams', '$state', 'Authentication', 'Flashcards', 'flashcards', 'Sentence', 'sentences',
	function($scope, $stateParams, $state, Authentication, Flashcards, flashcards, Sentence,  sentences ) {
		$scope.authentication = Authentication;
        $scope.sentences = sentences.sentences;
        $scope.flashcards = flashcards;

        $scope.cardForm = new Flashcards();

        //Check the sentenceof the card
        function checkSentence(cardResponse){
            if(sentences.length > 0) {
                for (var j = 0; j <= Object.keys(sentences[0].sentences).length; j++) { //Get the number of languages
                    var lang = Object.keys(sentences[0].sentences)[j];    //Get the language

                    for (var i = 0; i <= sentences.length; i++) {
                        //FRENCH VERSION
                        //If the sentence already exists
                        if (cardResponse.sentence.fr === sentences[i].sentences.fr) {
                            //If the card wasn't already register for the sentence
                            if (sentences[i].fr.cards.word.fr.indexOf(cardResponse.word.fr) === -1) {
                                sentences[i].fr.cards.push(cardResponse._id);
                                sentences[i].$update();
                            }
                            //If the sentence doesn't exist
                        } else {
                            var sentenceForm = new Sentence();
                            sentenceForm.cards.fr = [cardResponse.sentences.fr];
                            sentenceForm.$save();
                        }
                    }
                }
            }else {
                var newSentence = new Sentence();
                newSentence.card = {fr : [cardResponse.sentences.fr], jp: [cardResponse.sentences.fr]};
                newSentence.$save();
            }
        }


        //Create new flashcard
        $scope.create = function() {
            // Redirect after save

            $scope.cardForm.$save(function(response) {
                checkSentence(response);
                $state.go('flashcards.view', {cardId : response._id});
                // Clear form fields
                $scope.cardForm = new Flashcards();
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };





		// Find a list of Flashcards
		$scope.find = function() {
			$scope.flashcards = Flashcards.query();
		};

		// Find existing Flashcard
		$scope.findOne = function() {
			$scope.flashcard = Flashcards.get({ 
				flashcardId: $stateParams.flashcardId
			});
		};
	}
]);
