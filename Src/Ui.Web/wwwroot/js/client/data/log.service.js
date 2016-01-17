angular.module("dataModule")
	.factory("logService", [
	"$resource",
	function ($resource) {
		return $resource("api/Logs/:logId", { logId: "@id" }, {
		});
	}
	]);