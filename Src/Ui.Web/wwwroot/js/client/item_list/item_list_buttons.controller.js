angular.module("itemListModule").controller(
	"itemListButtonsController", [
	"$scope",
	"ItemService",
	"ItemQueryService",
	function ($scope, itemService, itemQueryService) {
		loadItems();

		var item = null;

		$scope.drillToChildren = function (item) {
			loadItems(item.id);
		};

		$scope.subscribe('ITEM_NAV_TO_PARENT_REQUESTED', function () {
			loadItems(item ? item.parentId : null);
		});

		function loadItems(parentId) {
			if (parentId) {
				itemService.get({ itemId: parentId }, function (item) {
					$scope.items = item.children;
					$scope.publish('ITEM_SELECTED', item)
				})
			} else {
				itemQueryService.getRoot(function (data) {
					$scope.items = data;
					$scope.publish('ITEM_SELECTED', null)
				})
			}
		};
	}
	]);