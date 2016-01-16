angular.module("dataModule")
	.factory("controlService", [
	"$resource",
	function ($resource) {
		return $resource("api/controls/:itemId", { itemId: "@id" }, {
		});
	}
]);