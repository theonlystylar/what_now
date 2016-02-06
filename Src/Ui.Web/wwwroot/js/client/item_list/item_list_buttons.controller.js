angular.module("itemListModule").controller(
	"itemListButtonsController", [
		"$scope",
		"$timeout",
		"itemNodeDataService",
		"navBarStateService",
		"itemManager",
		function ($scope, $timeout, itemNodeDataService, navBarStateService, itemManager) {

			$scope.editing = navBarStateService.getEditing();

			initialize();

			function initialize() {
				setItems();
			}

			navBarStateService.subscribeToEditing($scope, function (event, args) {
				$scope.editing = args.editing;
				setItems();
			});

			$scope.onItemChange = function(item) {
				$scope.$parent.showChangeForm(item);
			}

			$scope.onItemSelect = function (item) {
				$scope.$parent.goToChildren(item);
			};

			$scope.$on("REFRESH_CHILD_ITEMS", function() {
				setItems();
			});

			function setItems() {
				var parentId = $scope.$parent.item == null ? null : $scope.$parent.item.getId();
				$scope.items = itemManager.getChildren(parentId);
			};
		}
	]);