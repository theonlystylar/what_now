angular.module("itemListModule").controller(
	"itemListButtonsController", [
		"$scope",
		"ItemService",
		"ItemQueryService",
		"itemNodeDataService",
		function ($scope, itemService, itemQueryService, itemNodeDataService) {
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
					itemNodeDataService.get({ parentId: parentId }, function(data) {
						$scope.items = data;
					});
					itemNodeDataService.get({ id: parentId }, function (data) {
						_item = data[0];
						$scope.publish("ITEM_SELECTED", _item);
					});
					//itemService.get({ itemId: parentId }, function(item) {
					//	_item = item;
					//	$scope.items = item.children;
					//	$scope.publish("ITEM_SELECTED", item);
					//});
				} else {
					itemNodeDataService.get({ parentId: null }, function (data) {
						_item = null;
						$scope.items = data;
						$scope.publish("ITEM_SELECTED", _item);
					});
					//itemQueryService.getRoot(function(data) {
					//	_item = null;
					//	$scope.items = data;
					//	$scope.publish("ITEM_SELECTED", null);
					//});
				}
			};
		}
	]);