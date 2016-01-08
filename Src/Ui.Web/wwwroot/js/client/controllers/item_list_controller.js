var clientAppControllers = angular.module("clientAppControllers", []);

clientAppControllers.controller("ItemListController", [
	"$scope", "$http", "ItemService", function($scope, $http, itemService) {

		$scope.items = itemService.query();

		$scope.onClick = function(name) {
			alert(name);
		};
	}
]);