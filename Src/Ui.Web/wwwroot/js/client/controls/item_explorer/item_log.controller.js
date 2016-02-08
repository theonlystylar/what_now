angular.module("clientApp.controls")
	.controller(
		"itemLogController", [
			"$scope",
			"$timeout",
			"itemExplorerState",
			"controlManager",
			function ($scope, $timeout, itemExplorerState, controlManager) {

				initialize();

				$scope.cancel = function() {
					back();
				}

				$scope.save = function() {
					
				}
				
				$scope.selectDateTime = function (e) {
					// two way binding of the datetimepicker value doesn't 
					// appear to work so using event instead
					var datePicker = e.sender;
					$scope.dateTimeOverride = datePicker.value();
				};

				//#region event handling

				itemExplorerState.subscribeToNavigateBack($scope, back);

				//#endregion

				//#region private functions

				function back() {
					itemExplorerState.setSelectedItemToParent();
					itemExplorerState.setSelectedView("list");
				}

				function initialize() {
					// HACK: Using $timeout to allow thread to finish DOM setup before returning
					// to loading the items.  This is needed so that transition style work as each
					// item is rendered in the DOM.
					$timeout(loadControls, 100);
					$scope.item = itemExplorerState.getSelectedItem();
					$scope.currentDate = new Date();
					$scope.dateTimeOverride = null;
				}

				function loadControls() {
					$scope.controls = controlManager.getByItemId($scope.item.getId());
				};

				//#endregion
			}
		]);