var clientAppControllers = angular.module("clientAppControllers", []);

clientAppControllers.controller("ItemListController", [
	"$scope", "$http", "ItemQueryService", function($scope, $http, itemQueryService) {

		itemQueryService.getRoot(function (data) {
			$scope.items = data;
		})

		$scope.onClick = function(name) {
			alert(name);

		};
	}
]);