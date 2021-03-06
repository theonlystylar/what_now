﻿angular.module("clientApp.controls")
	.controller(
		"itemExplorerController", [
			"$scope",
			"itemExplorerState",
			"itemManager",
			"controlManager",
			function($scope, itemExplorerState, itemManager, controlManager) {

				// preload items before intializing controller
				// child controls assume the item manager is loaded
				itemManager
					.load()
					.then(function() {
						return controlManager.load();
					})
					.then(function () {
						initialize();
					});

				$scope.back = function() {
					itemExplorerState.navigateBack();
				}

				//#region event handling

				itemExplorerState.subscribeToSelectedItemChanged($scope, function(e, item) {
					$scope.item = item;
				});

				itemExplorerState.subscribeToSelectedViewChanged($scope, function(e, view) {
					$scope.isExploring = view === "list";
					$scope.isLogging = view === "log";
					$scope.isEditing = view === "edit";
				});

				//#endregion

				//#region private functions

				function initialize() {
					$scope.item = itemExplorerState.getSelectedItem();
					itemExplorerState.setSelectedView("list");
				}

				//#endregion
			}
		]);