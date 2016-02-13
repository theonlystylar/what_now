angular.module("clientApp.controls")
	.factory("itemExplorerState", [
		"$rootScope",
		"itemManager",
		function($rootScope, itemManager) {

			var _selectedItem = null,
				_selectedItemChanged = "SELECTED_ITEM_CHANGED",
				_selectedView = "",
				_selectedViewChanged = "SELECTED_VIEW_CHANGED",
				_navigateBack = "NAVIGATE_BACK_REQUESTED";

			function getSelectedItemId() {
				return _selectedItem == null ? null : _selectedItem.id();
			}

			function getSelectedItemParentId() {
				return _selectedItem == null ? null : _selectedItem.parentId();
			}

			function getSelectedItem() {
				return _selectedItem;
			}

			function setSelectedItem(item) {
				_selectedItem = item;
				publishOnSelectedItemChanged();
			}

			function getSelectedView() {
				return _selectedView;
			}

			function setSelectedView(viewName) {
				_selectedView = viewName;
				publishOnSelectedViewChanged();
			}

			function navigateBack() {
				publishOnNavigateBack();
			}

			//#region events

			function subscribeToSelectedItemChanged(scope, callback) {
				var handler = $rootScope.$on(_selectedItemChanged, callback);
				scope.$on("$destroy", handler);
			}

			function publishOnSelectedItemChanged() {
				$rootScope.$emit(_selectedItemChanged, _selectedItem);
			}

			function subscribeToSelectedViewChanged(scope, callback) {
				var handler = $rootScope.$on(_selectedViewChanged, callback);
				scope.$on("$destroy", handler);
			}

			function publishOnSelectedViewChanged() {
				$rootScope.$emit(_selectedViewChanged, _selectedView);
			}

			function subscribeToNavigateBack(scope, callback) {
				var handler = $rootScope.$on(_navigateBack, callback);
				scope.$on("$destroy", handler);
			}

			function publishOnNavigateBack() {
				$rootScope.$emit(_navigateBack);
			}

			//#endregion

			//#region private functions

			function setSelectedItemToParent() {
				var parentId = getSelectedItemParentId();
				var parent = itemManager.getById(parentId);
				setSelectedItem(parent);
			}

			//#endregion

			return {
				getSelectedItemId: getSelectedItemId,
				getSelectedItem: getSelectedItem,
				setSelectedItem: setSelectedItem,
				setSelectedItemToParent: setSelectedItemToParent,
				getSelectedView: getSelectedView,
				setSelectedView: setSelectedView,
				navigateBack: navigateBack,
				subscribeToSelectedItemChanged: subscribeToSelectedItemChanged,
				subscribeToSelectedViewChanged: subscribeToSelectedViewChanged,
				subscribeToNavigateBack: subscribeToNavigateBack
			};
		}
	]);