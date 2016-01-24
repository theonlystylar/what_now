angular.module("navBarModule").controller(
	"NavBarController", [
		"$scope",
		function ($scope) {

			$scope.getCurrentTab = function() {
				return "trackstuff";
			}
		}
	]);