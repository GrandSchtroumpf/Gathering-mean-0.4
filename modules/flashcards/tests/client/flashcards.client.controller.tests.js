'use strict';

(function() {
	// Flashcards Controller Spec
	describe('Flashcards Controller Tests', function() {
		// Initialize global variables
		var FlashcardsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Flashcards controller.
			FlashcardsController = $controller('FlashcardsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Flashcard object fetched from XHR', inject(function(Flashcards) {
			// Create sample Flashcard using the Flashcards service
			var sampleFlashcard = new Flashcards({
				name: 'New Flashcard'
			});

			// Create a sample Flashcards array that includes the new Flashcard
			var sampleFlashcards = [sampleFlashcard];

			// Set GET response
			$httpBackend.expectGET('api/flashcards').respond(sampleFlashcards);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.flashcards).toEqualData(sampleFlashcards);
		}));

		it('$scope.findOne() should create an array with one Flashcard object fetched from XHR using a flashcardId URL parameter', inject(function(Flashcards) {
			// Define a sample Flashcard object
			var sampleFlashcard = new Flashcards({
				name: 'New Flashcard'
			});

			// Set the URL parameter
			$stateParams.flashcardId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/api\/flashcards\/([0-9a-fA-F]{24})$/).respond(sampleFlashcard);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.flashcard).toEqualData(sampleFlashcard);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Flashcards) {
			// Create a sample Flashcard object
			var sampleFlashcardPostData = new Flashcards({
				name: 'New Flashcard'
			});

			// Create a sample Flashcard response
			var sampleFlashcardResponse = new Flashcards({
				_id: '525cf20451979dea2c000001',
				name: 'New Flashcard'
			});

			// Fixture mock form input values
			scope.name = 'New Flashcard';

			// Set POST response
			$httpBackend.expectPOST('api/flashcards', sampleFlashcardPostData).respond(sampleFlashcardResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Flashcard was created
			expect($location.path()).toBe('/flashcards/' + sampleFlashcardResponse._id);
		}));

		it('$scope.update() should update a valid Flashcard', inject(function(Flashcards) {
			// Define a sample Flashcard put data
			var sampleFlashcardPutData = new Flashcards({
				_id: '525cf20451979dea2c000001',
				name: 'New Flashcard'
			});

			// Mock Flashcard in scope
			scope.flashcard = sampleFlashcardPutData;

			// Set PUT response
			$httpBackend.expectPUT(/api\/flashcards\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/flashcards/' + sampleFlashcardPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid flashcardId and remove the Flashcard from the scope', inject(function(Flashcards) {
			// Create new Flashcard object
			var sampleFlashcard = new Flashcards({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Flashcards array and include the Flashcard
			scope.flashcards = [sampleFlashcard];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/api\/flashcards\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFlashcard);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.flashcards.length).toBe(0);
		}));
	});
}());