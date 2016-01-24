angular.module("itemListModule").controller(
	"itemListController", [
		"$scope",
		"itemNodeDataService",
		function($scope, itemNodeDataService) {

			initialize();

			function initialize() {
				$scope.item = null;
				$scope.isButtonsVisible = true;
				$scope.isFormVisible = false;
			}

			$scope.drill = function(item) {
				$scope.item = item;
				setVisibility();
				refreshChildItems();
			}

			$scope.back = function() {
				var parentId = $scope.item == null ? null : $scope.item.parentId;
				itemNodeDataService.get(parentId).then(function(item) {
					$scope.item = item;
					setVisibility();
					refreshChildItems();
				});
			}

			function refreshChildItems() {
				$scope.$broadcast("REFRESH_CHILD_ITEMS");
			}

			function setVisibility() {
				var itemId = $scope.item == null ? null : $scope.item.id;
				itemNodeDataService.getChildren(itemId).then(function(children) {
					$scope.isFormVisible = (children.length === 0); // no children
					$scope.isButtonsVisible = children.length > 0; // has children
				});
			}
		}
	]);