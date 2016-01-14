angular.module("navBarModule").controller(
	"NavBarController", [
	"$scope",
	function ($scope) {
		$scope.back = function () {
			$window.history.back();
		};
	}
	]);