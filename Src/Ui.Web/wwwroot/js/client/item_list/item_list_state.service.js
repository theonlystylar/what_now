angular.module("itemListModule")
	.factory("itemListState", [
		"$rootScope",
		"itemManager",
		function($rootScope, itemManager) {

			var _selectedItem = null,
				_selectedItemChanged = "SELECTED_ITEM_CHANGED";
				//_visibleView = "BUTTONS",
				//_visibleViewChanged = "VISIBLE_VIEW_CHANGED";

			function getSelectedItemId() {
				return _selectedItem == null ? null : _selectedItem.getId();
			}

			function getSelectedItemParentId() {
				return _selectedItem == null ? null : _selectedItem.getParentId();
			}

			function getSelectedItem() {
				return _selectedItem;
			}

			function setSelectedItem(item) {
				_selectedItem = item;
				publishOnSelectedItemChanged();
			}

			// events

			function subscribeToSelectedItemChanged(scope, callback) {
				var handler = $rootScope.$on(_selectedItemChanged, callback);
				scope.$on("$destroy", handler);
			}

			function publishOnSelectedItemChanged() {
				$rootScope.$emit(_selectedItemChanged, _selectedItem);
			}

			//function subscribeToVisibleViewChanged(scope, callback) {
			//	var handler = $rootScope.$on(_visibleViewChanged, callback);
			//	scope.$on("$destroy", handler);
			//}

			//function publishOnVisibleViewChanged() {
			//	$rootScope.$emit(_visibleViewChanged, _visibleView);
			//}

			// private methods

			function setSelectedItemToParent() {
				var parentId = getSelectedItemParentId();
				var parent = itemManager.getById(parentId);
				setSelectedItem(parent);
			}

			//function setVisibleView(viewName) {
			//	_visibleView = viewName;
			//	publishOnVisibleViewChanged();
			//}

			return {
				getSelectedItemId: getSelectedItemId,
				getSelectedItem: getSelectedItem,
				setSelectedItem: setSelectedItem,
				setSelectedItemToParent: setSelectedItemToParent,
				subscribeToSelectedItemChanged: subscribeToSelectedItemChanged
				//subscribeToVisibleViewChanged: subscribeToVisibleViewChanged
			};
		}
	]);