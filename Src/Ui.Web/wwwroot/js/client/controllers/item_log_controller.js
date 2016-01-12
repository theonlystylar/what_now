var clientAppControllers = angular.module("clientAppControllers");

clientAppControllers.controller(
	"ItemLogController", [
	"$scope",
	"$routeParams",
	"$window",
	function ($scope, $routeParams, $window) {
		var parentId = $routeParams.itemId;

		$scope.hasParent = parentId > 0;

		$scope.back = function () {
			$window.history.back();
		};
	}
]);