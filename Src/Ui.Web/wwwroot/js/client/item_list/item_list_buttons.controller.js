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
				$timeout(loadItems, 100);
			}

			navBarStateService.subscribeToEditing($scope, function (event, args) {
				$scope.editing = args.editing;
				loadItems();
			});

			$scope.onItemChange = function(item) {
				$scope.$parent.showChangeForm(item);
			}

			$scope.selectItem = function (item) {
				itemListState.setSelectedItem(item);
			}

			// bind events

			itemListState.subscribeToSelectedItemChanged($scope, function() {
				if (itemManager.getChildren(itemListState.getSelectedItemId()).length === 0) {
					itemListState.setSelectedView(itemListState.viewEnum.logForm);
					return;
				}
				loadItems();
			});

			// private methods

			function loadItems() {
				var selectedItemId = itemListState.getSelectedItemId();
				$scope.items = itemManager.getChildren(selectedItemId);
			};
		}
	]);