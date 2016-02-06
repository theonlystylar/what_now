angular.module("itemListModule")
	.controller(
		"itemListController", [
			"$scope",
			"itemDataService",
			"itemManager",
			function($scope, itemDataService, itemManager) {

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
					refreshChildItems();
				}

				$scope.goToChildren = function(item) {
					$scope.item = item;
					setVisibility();
					refreshChildItems();
				}

				$scope.back = function() {
					var parentId = $scope.item == null ? null : $scope.item.getParentId();
					var parent = itemManager.getById(parentId)
					$scope.item = parent;
					setVisibility();
					refreshChildItems();
				}

				function refreshChildItems() {
					$scope.$broadcast("REFRESH_CHILD_ITEMS");
				}

				function setVisibility() {
					var itemId = $scope.item == null ? null : $scope.item.getId();
					var children = itemManager.getChildren(itemId);
					$scope.isFormVisible = (children.length === 0); // no children
					$scope.isButtonsVisible = children.length > 0; // has children
				}
			}
		]);