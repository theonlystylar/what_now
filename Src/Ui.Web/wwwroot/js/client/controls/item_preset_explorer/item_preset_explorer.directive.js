angular.module("clientApp.controls").directive(
	"itemPresetExplorer",
	function () {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "js/client/controls/item_preset_explorer/item_preset_explorer.template.html",
			controller: "itemPresetExplorerController"
		}
	}
);