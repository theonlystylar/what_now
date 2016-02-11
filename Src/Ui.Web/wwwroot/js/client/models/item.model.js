angular.module("clientApp.modelsModule")
	.factory("Item", [
		function() {

			function Item(data) {
				var that = this,
					_id = data.id,
					_parentId = data.parentId,
					_name = data.name,
					_funnyName = data.funnyName,
					_imageId = data.imageId,
					_iconFile = null,
					_isDirty = false;

				that.getDisplayName = function() {
					return _funnyName || _name;
				};

				that.icon = function (value) {
					return arguments.length ? (_imageId = value) : _imageId;
				}

				that.iconFile = function(value) {
					return arguments.length ? (_iconFile = value) : _iconFile;
				}

				that.displayName = function() {
					return _funnyName || _name;
				};

				that.funnyName = function(value) {
					return arguments.length ? (_funnyName = value) : _funnyName;
				};

				that.name = function(value) {
					return arguments.length ? (_name = value) : _name;
				};

				that.getId = function() {
					return _id;
				};

				that.getImageId = function() {
					return _imageId || 0;
				};
				that.getParentId = function() {
					return _parentId;
				};

				that.setParentId = function(parentId) {
					setProperty(_parentId, parentId);
				};

				that.isDirty = function() {
					return _isDirty;
				};

				function setProperty(property, value) {
					if (property !== value) {
						property = value;
						_isDirty = true;
						return true;
					}
					return false;
				}
			}

			// Static Properties

			Item.build = function(data) {
				return new Item(data);
			};
			Item.responseTransformer = function(data) {
				if (angular.isArray(data)) {
					return data
						.map(Item.build)
						.filter(Boolean);
				}
				return Item.build(data);
			};
			return Item;
		}
	]);