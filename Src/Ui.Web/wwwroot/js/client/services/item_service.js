var clientAppServices = angular.module("clientAppServices", ["ngResource"]);

clientAppServices.factory("ItemService", [
	"$resource",
	function($resource) {
		return $resource("js/client/:itemId.json", {}, {
			query: { method: "GET", params: { itemId: "items" }, isArray: true }
		});
	}
]);