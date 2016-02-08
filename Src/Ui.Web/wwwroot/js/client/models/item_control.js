angular.module("clientApp.modelsModule")
	.factory("ItemControl", [
		function () {

			function ItemControl(data) {
				var that = this,
					_id = data.id,
					_itemId = data.itemId,
					_name = data.name,
					_funnyName = data.funnyName;

				that.getDisplayName = function () {
					return _funnyName || _name;
				}

				that.getId = function () {
					return _id;
				};

				that.getItemId = function () {
					return _itemId;
				};
			}

			// Static Properties

			ItemControl.build = function (data) {
				return new ItemControl(data);
			}

			ItemControl.responseTransformer = function (data) {
				if (angular.isArray(data)) {
					return data
						.map(ItemControl.build)
						.filter(Boolean);
				}
				return ItemControl.build(data);
			}

			return ItemControl;
		}
	]);