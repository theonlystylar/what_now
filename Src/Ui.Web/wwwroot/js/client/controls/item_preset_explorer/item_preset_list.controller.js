angular.module("clientApp.controls")
	.controller(
		"itemPresetListController", [
			"$scope",
			"$timeout",
			"itemPresetExplorerState",
			"itemPresetManager",
			"navBarStateService",
			function ($scope, $timeout, itemPresetExplorerState, itemPresetManager, navBarStateService) {

				initialize();

				$scope.editItemPreset = function (itemPreset) {
					itemPresetExplorerState.setSelectedItemPreset(itemPreset);
					itemPresetExplorerState.setSelectedView("edit");
				}

				$scope.selectItemPreset = function (itemPreset) {
					itemPresetExplorerState.setSelectedItemPreset(itemPreset);
				}

				//#region event handling

				itemPresetExplorerState.subscribeToSelectedItemPresetChanged($scope, function () {
					// if no children then log
					if (itemPresetManager.getChildren(itemPresetExplorerState.getSelectedItemPresetId()).length === 0) {
						//itemPresetExplorerState.setSelectedView("log");
						// TODO: log
						return;
					}
					// otherwise show child item presets
					loadItemPresets();
				});

				itemPresetExplorerState.subscribeToNavigateBack($scope, function () {
					itemPresetExplorerState.setSelectedItemPresetToParent();
				});

				navBarStateService.subscribeToEditing($scope, function (event, args) {
					$scope.editing = args.editing;
				});

				//#endregion

				//#region private functions

				function initialize() {
					// HACK: Using $timeout to allow thread to finish DOM setup before returning
					// to loading the item presets.  This is needed so that transition style work as each
					// item preset is rendered in the DOM.
					$timeout(loadItemPresets, 100);
					$scope.editing = navBarStateService.getEditing();
				}

				function loadItemPresets() {
					var itemPresetId = itemPresetExplorerState.getSelectedItemPresetId();
					$scope.itemPresets = itemPresetManager.getChildren(itemPresetId);
				};

				//#endregion
			}
		]);