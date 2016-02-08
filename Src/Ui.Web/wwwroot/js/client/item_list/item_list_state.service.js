﻿angular.module("itemListModule")
	.factory("itemListState", [
		"$rootScope",
		"itemManager",
		function($rootScope, itemManager) {

			var _selectedItem = null,
				_selectedItemChanged = "SELECTED_ITEM_CHANGED",
				_viewEnum = {
					buttons: 0,
					buttonEditor: 1,
					logForm: 2,
					none: 3
				},
				_selectedView = _viewEnum.none,
				_selectedViewChanged = "SELECTED_VIEW_CHANGED";

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

			function getSelectedView() {
				return _selectedView;
			}

			function setSelectedView(viewEnum) {
				_selectedView = viewEnum;
				publishOnSelectedViewChanged();
			}

			function showButtons() {
				setSelectedView(_viewEnum.buttons);
			}

			function showLogForm() {
				setSelectedView(_viewEnum.logForm);
			}

			// events

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

			// private methods

			function setSelectedItemToParent() {
				var parentId = getSelectedItemParentId();
				var parent = itemManager.getById(parentId);
				setSelectedItem(parent);
			}

			return {
				viewEnum: _viewEnum,
				getSelectedItemId: getSelectedItemId,
				getSelectedItem: getSelectedItem,
				setSelectedItem: setSelectedItem,
				setSelectedItemToParent: setSelectedItemToParent,
				getSelectedView: getSelectedView,
				setSelectedView: setSelectedView,
				showButtons: showButtons,
				showLogForm: showLogForm,
				subscribeToSelectedItemChanged: subscribeToSelectedItemChanged,
				subscribeToSelectedViewChanged: subscribeToSelectedViewChanged
			};
		}
	]);