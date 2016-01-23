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
				itemNodeDataService.getChildren(item == null ? null : item.id).then(function(children) {
					$scope.isFormVisible = (children.length === 0); // no children
					$scope.isButtonsVisible = children.length > 0; // has children
				});
			});

			$scope.goToParent = function() {
				$scope.publish("ITEM_NAV_TO_PARENT_REQUESTED", {});
			};
		}
	]);