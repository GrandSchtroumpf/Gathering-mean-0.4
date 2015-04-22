'use strict';

angular.module('missions').controller('ThisMissionController', ['$scope','mission','$state',
    function($scope, mission, $state) {

        $scope.mission = mission;
        if($scope.mission.template !== ''){$scope.hasTemplate = true;}
        else {$scope.hasTemplate = false;}


        //Working with templates
        $scope.addTemplate = function() {
            if ($scope.mission.template === ''){
                $scope.mission.template = 'flashcards';
                $scope.hasTemplate = !$scope.hasTemplate;
                $scope.urlTemplate = 'modules/missions/views/templates/' + $scope.mission.template +'/' + $scope.mission.template + '.html';
            }
        };


        // Update existing Mission
        $scope.update = function() {
            var mission = $scope.mission;

            mission.$update(function() {
                $state.go('thisMission.view', {missionId : mission._id});
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Mission
        $scope.remove = function() {
            mission.$remove(function() {
                $state.go('missions.list', {}, {reload : true});
            });
        };
    }
]);
