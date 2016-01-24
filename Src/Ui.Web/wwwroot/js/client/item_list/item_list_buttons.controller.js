angular.module("itemListModule").controller(
	"itemListButtonsController", [
		"$scope",
		"$timeout",
		"itemNodeDataService",
		function($scope, $timeout, itemNodeDataService) {

			initialize();

			function initialize() {
				$timeout(function () {
					// DOM has finished rendering
					// Need to wait until DOM is rendered before loading the items so the buttons are rendered
					// and the transition "bounce" is visible
					setItems();
				});
			}

			$scope.onItemSelect = function (item) {
				$scope.$parent.drill(item);
			};

			$scope.$on("REFRESH_CHILD_ITEMS", function() {
				setItems();
			});

			function setItems() {
				var parentId = $scope.$parent.item == null ? null : $scope.$parent.item.id;
				itemNodeDataService.getChildren(parentId).then(function(items) {
					$scope.items = items;
				});
			};
		}
	]);