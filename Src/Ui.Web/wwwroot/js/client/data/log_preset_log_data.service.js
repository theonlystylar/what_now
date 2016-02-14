angular.module("dataModule")
	.factory("logPresetLogData", [
	"$resource",
	function ($resource) {
		return $resource("api/logpresetlogs/:itemPresetId", { itemPresetId: "@id" }, {
		});
	}
	]);