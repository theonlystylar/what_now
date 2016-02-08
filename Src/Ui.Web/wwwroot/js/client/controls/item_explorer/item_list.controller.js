angular.module("clientApp.controls")
	.controller(
		"itemListController", [
			"$scope",
			"$timeout",
			"itemExplorerState",
			"itemManager",
			"navBarStateService",
			function ($scope, $timeout, itemExplorerState, itemManager, navBarStateService) {

				initialize();

				$scope.editItem = function (item) {
					itemExplorerState.setSelectedItem(item);
					itemExplorerState.setSelectedView("edit");
				}

				$scope.selectItem = function (item) {
					itemExplorerState.setSelectedItem(item);
				}

				//#region event handling

				itemExplorerState.subscribeToSelectedItemChanged($scope, function () {
					// if no children then change view to item log
					if (itemManager.getChildren(itemExplorerState.getSelectedItemId()).length === 0) {
						itemExplorerState.setSelectedView("log");
						return;
					}
					// otherwise show child items
					loadItems();
				});

				itemExplorerState.subscribeToNavigateBack($scope, function () {
					itemExplorerState.setSelectedItemToParent();
				});

				navBarStateService.subscribeToEditing($scope, function (event, args) {
					$scope.editing = args.editing;
				});

				//#endregion

				//#region private functions

				function initialize() {
					// HACK: Using $timeout to allow thread to finish DOM setup before returning
					// to loading the items.  This is needed so that transition style work as each
					// item is rendered in the DOM.
					$timeout(loadItems, 100);
					$scope.editing = navBarStateService.getEditing();
				}

				function loadItems() {
					var selectedItemId = itemExplorerState.getSelectedItemId();
					$scope.items = itemManager.getChildren(selectedItemId);
				};

				//#endregion
			}
		]);