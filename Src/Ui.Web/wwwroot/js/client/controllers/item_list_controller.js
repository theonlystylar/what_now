var clientApp = angular.module("clientApp", []);

clientApp.controller("ItemListController", [
	"$scope", "$http", function($scope, $http) {

		$http.get("js/client/items.json").success(function(data) {
			$scope.items = data;
		});

		$scope.onClick = function(name) {
			alert(name);
		};
	}
]);