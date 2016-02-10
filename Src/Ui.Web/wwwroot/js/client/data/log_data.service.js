angular.module("dataModule")
	.factory("logData", [
	"$resource",
	function ($resource) {
		return $resource("api/Logs/:logId", { logId: "@id" }, {
		});
	}
	]);