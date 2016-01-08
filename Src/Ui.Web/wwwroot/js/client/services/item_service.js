var clientAppServices = angular.module("clientAppServices", ["ngResource"]);

clientAppServices.factory("ItemService", [
	"$resource",
	function($resource) {
		return $resource("api/items/:itemId", {itemId: "@id"}, {
		});
	}
]);