angular.module("clientApp.controls")
	.controller(
		"itemPresetExplorerController", [
			"$scope",
			"itemPresetExplorerState",
			"itemPresetManager",
			//"controlManager",
			function ($scope, itemPresetExplorerState, itemPresetManager /*, controlManager */) {

				// preload item presets before intializing controller
				// child controls assume the item manager is loaded
				itemPresetManager
					.load()
					.then(function () {
						initialize();
					});

				$scope.back = function () {
					itemPresetExplorerState.navigateBack();
				}

				//#region event handling

				itemPresetExplorerState.subscribeToSelectedItemPresetChanged($scope, function (e, itemPreset) {
					$scope.itemPreset = itemPreset;
				});

				itemPresetExplorerState.subscribeToSelectedViewChanged($scope, function (e, view) {
					$scope.isExploring = view === "list";
					$scope.isEditing = view === "edit";
				});

				//#endregion

				//#region private functions

				function initialize() {
					$scope.itemPreset = itemPresetExplorerState.getSelectedItemPreset();
					itemPresetExplorerState.setSelectedView("list");
				}

				//#endregion
			}
		]);