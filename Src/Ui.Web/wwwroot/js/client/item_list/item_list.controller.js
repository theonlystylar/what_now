angular.module("itemListModule")
	.controller(
		"itemListController", [
			"$scope",
			"itemListState",
			"itemDataService",
			"itemManager",
			function($scope, itemListState, itemDataService, itemManager) {

				// preload items before intializing controller
				itemManager.load().then(function() {
					initialize();
				});

				function initialize() {
					$scope.item = null;
					$scope.isButtonsVisible = true;
					$scope.isFormVisible = false;
					$scope.isButtonEditorVisible = false;
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

				$scope.goToChildren = itemListState.setSelectedItem;
				$scope.back = itemListState.setSelectedItemToParent;

				// bind events

				itemListState.subscribeToSelectedItemChanged($scope, setItem);
				//itemListState.subscribeToVisibleViewChanged($scope, setVisibility);

				// private functions

				function setItem(e, item) {
					$scope.item = item;
					setVisibility();
				}

				function setVisibility() {
					var itemId = $scope.item == null ? null : $scope.item.getId();
					var children = itemManager.getChildren(itemId);
					$scope.isFormVisible = (children.length === 0); // no children
					$scope.isButtonsVisible = children.length > 0; // has children
				}
			}
		]);