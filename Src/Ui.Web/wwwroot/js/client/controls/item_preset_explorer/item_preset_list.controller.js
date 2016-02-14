angular.module("clientApp.controls")
	.controller(
		"itemPresetListController", [
			"$scope",
			"$timeout",
			"itemPresetExplorerState",
			"itemPresetManager",
			"navBarStateService",
			"logPresetLogData",
			function ($scope, $timeout, itemPresetExplorerState, itemPresetManager, navBarStateService, logPresetLogData) {

				initialize();

				$scope.editItemPreset = function (itemPreset) {
					itemPresetExplorerState.setSelectedItemPreset(itemPreset);
					itemPresetExplorerState.setSelectedView("edit");
				}

				$scope.selectItemPreset = function (itemPreset) {
					// if children then drill down
					if (itemPresetManager.getChildren(itemPreset.id()).length > 0) {
						itemPresetExplorerState.setSelectedItemPreset(itemPreset);
						return;
					}
					// otherwise log
					logPresetLogData
						.save(itemPreset.id())
						.$promise
						.then(
							// success
							function () {
								toastr["success"]("Logged " + itemPreset.displayName());
							},
							// error
							function (error) {
								toastr["error"](error);
							});
				}

				//#region event handling

				itemPresetExplorerState.subscribeToSelectedItemPresetChanged($scope, loadItemPresets);

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