'use strict';

//Setting up route
angular.module('missions').config(['$stateProvider',
	function($stateProvider) {
		// Missions state routing
		$stateProvider.
		state('missions', {
			abstract: true,
			url: '/mission',
			template: '<ui-view/>',
            resolve: {missions: function (allMissionsLoader) {return allMissionsLoader();}},
            controller: 'MissionsController'
		}).
		state('missions.list', {
			url: '',
			templateUrl: 'modules/missions/views/list-missions.client.view.html'
		}).
		state('missions.create', {
			url: '/create',
			templateUrl: 'modules/missions/views/create-mission.client.view.html'
		}).

        state('thisMission',{
            abstract : true,
            template : '<ui-view/>',
            url : '/thisMission/:missionId',
            controller: 'ThisMissionController',    //Il faut recharger le controller sinon on ne récupère pas missionId
            resolve : {mission: ['Missions', '$stateParams', '$q',
                function(Missions, $stateParams, $q) {
                    var delay = $q.defer();
                    Missions.get({missionId: $stateParams.missionId},
                        function(mission) {delay.resolve(mission);},
                        function() {delay.reject('Mission non trouve : ' + $stateParams.missionId);});
                    {return delay.promise;}	//A la fin on retourne le résultat
                }]
            }
        }).
		state('thisMission.view', {
			url: '',
			templateUrl: 'modules/missions/views/view-mission.client.view.html'
		}).
		state('thisMission.edit', {
			url: '/edit',
			templateUrl: 'modules/missions/views/edit-mission.client.view.html'
		});
	}
]);
