angular.module("itemListModule").directive(
	"itemList",
	function () {
		return {
			restrict: "E",
			templateUrl: "js/client/item_list/item_list.template.html",
			controller: "itemListController"
		}
	}
);