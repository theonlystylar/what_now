angular.module("itemListModule").controller(
	"itemListController", [
		"$scope",
		"itemNodeDataService",
		function($scope, itemNodeDataService) {
			$scope.item = null;
			$scope.isButtonsVisible = true;
			$scope.isFormVisible = false;

			$scope.subscribe("ITEM_SELECTED", function(item) {
				$scope.item = item;
				itemNodeDataService.get({ parentId: (item == null ? null : item.id) }, function(data) {
					$scope.isFormVisible = (data.length === 0); // no children
					$scope.isButtonsVisible = data.length > 0; // has children
				});
			});

			$scope.goToParent = function() {
				$scope.publish("ITEM_NAV_TO_PARENT_REQUESTED", {});
			};
		}
	]);