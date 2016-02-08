angular.module("itemListModule").directive(
	"itemList",
	function() {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "js/client/item_list/item_list.template.html",
			controller: "itemListController"
		}
	}
);

//angular.module("itemListModule").directive(
//	"itemButtons", [
//		"itemListState",
//		"itemManager",
//		function(itemListState, itemManager) {
//			return {
//				restrict: "A",
//				scope: {},
//				link: function($scope) {
//					var selectedItemId = itemListState.getSelectedItemId();
//					$scope.items = itemManager.getChildren(selectedItemId);
//				},
//				templateUrl: "js/client/item_list/item_list_buttons.template.html",
//				controller: "itemListButtonsController"
//			}
//		}
//	]
//);