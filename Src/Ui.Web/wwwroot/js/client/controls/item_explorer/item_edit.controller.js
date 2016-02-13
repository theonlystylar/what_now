angular.module("clientApp.controls")
	.controller(
		"itemEditController", [
			"$scope",
			"$timeout",
			"itemExplorerState",
			"itemManager",
			function ($scope, $timeout, itemExplorerState, itemManager) {

				initialize();

				$scope.cancel = $scope.back;

				$scope.save = function(item) {
					itemManager
						.save(item)
						.then(
							// success
							function () {
								toastr["success"]("Item " + $scope.item.displayName() + " saved");
								back();
							},
							// error
							function (error) {
								toastr["error"](error);
							});
				}

				//#region event handling

				itemExplorerState.subscribeToNavigateBack($scope, back);

				//#endregion

				//#region private functions

				function back() {
					itemExplorerState.setSelectedItemToParent();
					itemExplorerState.setSelectedView("list");
				}

				function initialize() {
					loadItems();
				}

				function loadItems() {
					$scope.item = itemExplorerState.getSelectedItem();
				};

				//#endregion
			}
		]);