var clientAppServices = angular.module("clientAppServices");

clientAppServices.factory("ItemLogService", [
	"$resource",
	function ($resource) {
		return $resource("api/itemLogs/:itemLogId", { itemLogId: "@id" }, {
		});
	}
]);