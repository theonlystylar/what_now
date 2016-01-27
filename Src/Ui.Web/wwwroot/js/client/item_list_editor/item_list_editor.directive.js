angular.module("clientApp.itemListEditorModule").directive(
	"itemListEditor",
	function () {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "js/client/item_list_editor/item_list_editor.template.html",
			controller: "itemListEditorController"
		}
	}
);