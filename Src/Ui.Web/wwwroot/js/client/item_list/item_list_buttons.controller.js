angular.module("itemListModule").controller(
	"itemListButtonsController", [
		"$scope",
		"$timeout",
		"itemListState",
		"navBarStateService",
		"itemManager",
		function ($scope, $timeout, itemListState, navBarStateService, itemManager) {

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

			// bind events

			itemListState.subscribeToSelectedItemChanged($scope, setItems);

			// private methods

			function setItems() {
				var selectedItemId = itemListState.getSelectedItemId();
				$scope.items = itemManager.getChildren(selectedItemId);
			};
		}
	]);