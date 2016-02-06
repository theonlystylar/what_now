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
					_isDirty = false;

				that.getDisplayName = function() {
					return _funnyName || _name;
				}

				that.getId = function () {
					return _id;
				};

				that.getImageId = function() {
					return _imageId || 0;
				}

				that.getParentId = function () {
					return _parentId;
				};

				that.setParentId = function (parentId) {
					setProperty(_parentId, parentId);
				};

				that.isDirty = function () {
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
			
			//Item.prototype.getId = function() {
			//	return _id;
			//};

			//Item.prototype.getParentId = function () {
			//	return _parentId;
			//};

			//Item.prototype.setParentId = function (parentId) {
			//	setProperty(_parentId, parentId);
			//};

			//Item.prototype.isDirty = function () {
			//	return _isDirty;
			//};

			// Static Properties

			Item.build = function(data) {
				return new Item(data);
			}

			Item.responseTransformer = function(data) {
				if (angular.isArray(data)) {
					return data
						.map(Item.build)
						.filter(Boolean);
				}
				return Item.build(data);
			}

			//function setProperty(property, value) {
			//	if (property !== value) {
			//		property = value;
			//		_isDirty = true;
			//		return true;
			//	}
			//	return false;
			//}

			return Item;
		}
	]);