angular.module("itemListModule")
	.controller(
		"itemListController", [
			"$scope",
			"itemListState",
			"itemDataService",
			"itemManager",
			function($scope, itemListState, itemDataService, itemManager) {

				var _loaded = false;

				// preload items before intializing controller
				itemManager.load().then(function () {
					_loaded = true;
					initialize();
				});

				function initialize() {
					$scope.item = null;
					itemListState.setSelectedView(itemListState.viewEnum.buttons);
				}

				$scope.showChangeForm = function(item) {
					$scope.selectedItem = item;
					$scope.isButtonsVisible = false;
					$scope.isFormVisible = false;
					$scope.isButtonEditorVisible = true;
				}

				$scope.hideChangeForm = function() {
					$scope.isButtonEditorVisible = false;
					setVisibility();
				}

				$scope.setSelectedItemToParent = itemListState.setSelectedItemToParent;

				$scope.isVisible = function (viewName) {
					//if (!_loaded) return false;
					return itemListState.viewEnum[viewName] === itemListState.getSelectedView();
				}

				// bind events

				itemListState.subscribeToSelectedItemChanged($scope, setItem);
				//itemListState.subscribeToSelectedViewChanged($scope, setVisibility);

				// private functions

				function setItem(e, item) {
					$scope.item = item;
				}

				//function setVisibility() {
				//	//$scope.$apply();
				//}
			}
		]);