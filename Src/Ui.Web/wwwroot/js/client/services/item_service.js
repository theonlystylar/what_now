var clientAppServices = angular.module("clientAppServices");

clientAppServices.factory("ItemService", [
	"$resource",
	function($resource) {
		return $resource("api/items/:itemId", {itemId: "@id"}, {
		});
	}
]);