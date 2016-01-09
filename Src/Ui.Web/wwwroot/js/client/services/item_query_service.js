var clientAppServices = angular.module("clientAppServices");

clientAppServices.factory("ItemQueryService", [
	"$http",
	function ($http) {
		return {
			getChildren: function (parentId, callback) {
				$http.get('api/items/children/' + parentId).success(callback);
			},
			getRoot: function (callback) {
				$http.get('api/items/children').success(callback);
			}
		};
	}
]);