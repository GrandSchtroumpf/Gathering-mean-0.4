'use strict';

//Setting up route
angular.module('messages').config(['$stateProvider', 'uiSelectConfig',
	function($stateProvider, uiSelectConfig) {

        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = true;


        // Messages state routing
		$stateProvider.
		state('messages', {
			abstract: true,
			url: '/messages/:userId',
			template: '<ui-view/>',
            controller:'MessagesController',
            resolve: {allMessages : function(allMessagesLoader) {return allMessagesLoader();} }
		}).
		state('messages.list', {
			url: '',
			templateUrl: 'modules/messages/views/list-messages.client.view.html'
		}).
		state('messages.create', {
			url: '/create/:messageObject',
			templateUrl: 'modules/messages/views/create-message.client.view.html',
            controller : 'CreateMessageController',
            resolve : {
                    allUsers : function(allUsersLoader){return allUsersLoader();},
                    message : ['Messages', '$stateParams',function(Messages, $stateParams) {{return $stateParams.messageObject;}}]
            }
		}).
		state('messages.view', {
			url: '/:messageId',
			templateUrl: 'modules/messages/views/view-message.client.view.html'
		}).
		state('messages.edit', {
			url: '/:messageId/edit',
			templateUrl: 'modules/messages/views/edit-message.client.view.html'
		});
	}
]);
