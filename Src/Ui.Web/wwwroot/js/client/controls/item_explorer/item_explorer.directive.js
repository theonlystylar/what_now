angular.module("clientApp.controls").directive(
	"itemExplorer",
	function () {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "js/client/controls/item_explorer/item_explorer.template.html",
			controller: "itemExplorerController"
		}
	}
);