'use strict';

angular.module('flashcards').controller('ThisFlashcardController', ['$scope', '$state', 'thisFlashcard',
	function($scope,$state,thisFlashcard) {


        $scope.thisFlashcard = thisFlashcard;


        // Remove existing Flashcard
        $scope.remove = function( flashcard ) {
            if ( flashcard ) { flashcard.$remove();

                for (var i in $scope.flashcards ) {
                    if ($scope.flashcards [i] === flashcard ) {
                        $scope.flashcards.splice(i, 1);
                    }
                }
            } else {
                $scope.flashcard.$remove(function() {
                    $state.go('flashcards');
                });
            }
        };

        // Update existing Flashcard
        $scope.update = function() {
            var flashcard = $scope.flashcard ;

            flashcard.$update(function() {
                $state.go('flashcards/' + flashcard._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
	}
]);
