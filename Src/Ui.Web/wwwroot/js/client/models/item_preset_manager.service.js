angular.module("clientApp.modelsModule")
	.factory("itemPresetManager", [
		"$q",
		"$timeout",
		"Upload",
		"itemPresetData",
		function ($q, $timeout, Upload, itemPresetData) {

			var _itemPresets;

			function getAll() {
				return _itemPresets;
			}

			function getById(id) {
				var found = _.filter(_itemPresets, function (itemPreset) {
					return itemPreset.id() === id;
				});
				if (found && found.length > 0) {
					return found[0];
				}
				return undefined;
			}

			function getChildren(id) {
				return _.filter(_itemPresets, function (itemPreset) {
					return itemPreset.parentId() === id;
				});
			}

			function load() {
				return itemPresetData
					.get()
					.then(function (itemPresets) {
						_itemPresets = itemPresets;
						return $timeout(function () {
							return;
						});
					});
			}

			function save(itemPreset) {
				if (!itemPreset.isDirty()) {
					return $q.reject("Item preset has not been changed, no need to update");
				}

				if (itemPreset.imageFile) {
					return Upload
						.upload({
							url: "api/itempresets/withimage",
							data: itemPreset.toDto()
						})
						.then(function (response) {
							return $q.when(itemPreset._fromDto(response.data));
						});
				}

				return itemPresetData.save(itemPreset.toDto());
			}

			return {
				getAll: getAll,
				getById: getById,
				getChildren: getChildren,
				load: load,
				save: save
			}
		}
	]);