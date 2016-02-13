angular.module("clientApp.modelsModule")
	.factory("itemManager", [
		"$q",
		"$timeout",
		"Upload",
		"itemData",
		function($q, $timeout, Upload, itemData) {

			var _items;

			function getAll() {
				return _items;
			}

			function getById(id) {
				var found = _.filter(_items, function(item) {
					return item.id() === id;
				});
				if (found && found.length > 0) {
					return found[0];
				}
				return undefined;
			}

			function getChildren(id) {
				return _.filter(_items, function(item) {
					return item.parentId() === id;
				});
			}

			function load() {
				return itemData
					.get()
					.then(function(items) {
						_items = items;
						return $timeout(function() {
							return;
						});
					});
			}

			function save(item) {
				if (!item.isDirty()) {
					return $q.reject("Item has not been changed, no need to update");
				}

				if (item.imageFile) {
					return Upload
						.upload({
							url: "api/items/withimage",
							data: item.toDto()
						})
						.then(function (response) {
							return $q.when(item._fromDto(response.data));
						});
				}

				return itemData.save(item.toDto());
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