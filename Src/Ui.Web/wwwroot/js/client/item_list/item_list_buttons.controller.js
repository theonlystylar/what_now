angular.module("itemListModule").controller(
	"itemListButtonsController", [
		"$scope",
		"itemNodeDataService",
		function ($scope, itemNodeDataService) {
			loadItems();

			var _item = null;

			$scope.drillToChildren = function(item) {
				loadItems(item.id);
			};

			$scope.subscribe("ITEM_NAV_TO_PARENT_REQUESTED", function() {
				loadItems(_item ? _item.parentId : null);
			});

			function loadItems(parentId) {
				if (parentId) {
					itemNodeDataService.get(parentId).then(function (item) {
						_item = item[0];
						$scope.publish("ITEM_SELECTED", _item);
					});
					itemNodeDataService.getChildren(parentId).then(function (items) {
						$scope.items = items;
					});
				} else {
					itemNodeDataService.getChildren(null).then(function (items) {
						_item = null;
						$scope.items = items;
						$scope.publish("ITEM_SELECTED", _item);
					});
				}
			};
		}
	]);