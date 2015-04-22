'use strict';

//Setting up route
angular.module('templates').config(['$stateProvider',
	function($stateProvider) {
		// Templates state routing
		$stateProvider.
		state('templates', {
			abstract: true,
			url: '/templates',
			template: '<ui-view/>'
		}).
		state('templates.list', {
			url: '',
			templateUrl: 'modules/templates/views/list-templates.client.view.html'
		}).
		state('templates.create', {
			url: '/create',
			templateUrl: 'modules/templates/views/create-template.client.view.html'
		}).
		state('templates.view', {
			url: '/:templateId',
			templateUrl: 'modules/templates/views/view-template.client.view.html'
		}).
		state('templates.edit', {
			url: '/:templateId/edit',
			templateUrl: 'modules/templates/views/edit-template.client.view.html'
		});
	}
]);