angular.module("navBarModule").controller(
	"NavBarController", [
		"$scope",
		"navBarStateService",
		function($scope, navBarStateService) {

			$scope.editing = navBarStateService.getEditing();
			$scope.toggleEditing = navBarStateService.toggleEditing;

			navBarStateService.subscribeToEditing($scope, function(event, args) {
				$scope.editing = args.editing;
			});
		}
	]);