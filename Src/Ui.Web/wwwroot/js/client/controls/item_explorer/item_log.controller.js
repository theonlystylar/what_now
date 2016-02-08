﻿angular.module("clientApp.controls")
	.controller(
		"itemLogController", [
			"$scope",
			"$timeout",
			"itemExplorerState",
			function ($scope, $timeout, itemExplorerState) {

				initialize();

				//#region event handling

				itemExplorerState.subscribeToNavigateBack($scope, function () {
					itemExplorerState.setSelectedItemToParent();
					itemExplorerState.setSelectedView("list");
				});

				//#endregion

				//#region private functions

				function initialize() {
					// HACK: Using $timeout to allow thread to finish DOM setup before returning
					// to loading the items.  This is needed so that transition style work as each
					// item is rendered in the DOM.
					$timeout(loadControls, 100);
				}

				function loadControls() {

				};

				//#endregion
			}
		]);