angular.module("clientApp.controls")
	.factory("itemPresetExplorerState", [
		"$rootScope",
		"itemPresetManager",
		function($rootScope, itemPresetManager) {

			var _selectedItemPreset = null,
				_selectedItemPresetChanged = "SELECTED_ITEM_PRESET_CHANGED",
				_selectedView = "",
				_selectedViewChanged = "SELECTED_VIEW_CHANGED",
				_navigateBack = "NAVIGATE_BACK_REQUESTED";

			function getSelectedItemPresetId() {
				return _selectedItemPreset == null ? null : _selectedItemPreset.id();
			}

			function getSelectedItemPresetParentId() {
				return _selectedItemPreset == null ? null : _selectedItemPreset.parentId();
			}

			function getSelectedItemPreset() {
				return _selectedItemPreset;
			}

			function setSelectedItemPreset(itemPreset) {
				_selectedItemPreset = itemPreset;
				publishOnSelectedItemPresetChanged();
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

			function subscribeToSelectedItemPresetChanged(scope, callback) {
				var handler = $rootScope.$on(_selectedItemPresetChanged, callback);
				scope.$on("$destroy", handler);
			}

			function publishOnSelectedItemPresetChanged() {
				$rootScope.$emit(_selectedItemPresetChanged, _selectedItemPreset);
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

			function setSelectedItemPresetToParent() {
				var parentId = getSelectedItemPresetParentId();
				var parent = itemPresetManager.getById(parentId);
				setSelectedItemPreset(parent);
			}

			//#endregion

			return {
				getSelectedItemPresetId: getSelectedItemPresetId,
				getSelectedItemPreset: getSelectedItemPreset,
				setSelectedItemPreset: setSelectedItemPreset,
				setSelectedItemPresetToParent: setSelectedItemPresetToParent,
				getSelectedView: getSelectedView,
				setSelectedView: setSelectedView,
				navigateBack: navigateBack,
				subscribeToSelectedItemPresetChanged: subscribeToSelectedItemPresetChanged,
				subscribeToSelectedViewChanged: subscribeToSelectedViewChanged,
				subscribeToNavigateBack: subscribeToNavigateBack
			};
		}
	]);