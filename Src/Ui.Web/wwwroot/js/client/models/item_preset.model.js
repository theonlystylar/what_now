angular.module("clientApp.modelsModule")
	.factory("ItemPreset", [
		function () {

			function ItemPreset(data) {
				var that = this,
					_id,
					_parentId,
					_name,
					_funnyName,
					_imageId,
					_imageFile,
					_isDirty;

				fromDto(data);

				that.id = function() {
					return _id;
				}

				that.imageId = function () {
					return _imageId;
				}

				that.imageFile = function (value) {
					if (arguments.length && _imageFile !== value) {
						_imageFile = value;
						_isDirty = true;
					}
					return _imageFile;
				}

				that.displayName = function () {
					return _funnyName || _name;
				};

				that.funnyName = function (value) {
					if (arguments.length && _funnyName !== value) {
						_funnyName = value;
						_isDirty = true;
					}
					return _funnyName;
				};

				that.name = function (value) {
					if (arguments.length && _name !== value) {
						_name = value;
						_isDirty = true;
					}
					return _name;
				};

				that.parentId = function (value) {
					if (arguments.length && _parentId !== value) {
						_parentId = value;
						_isDirty = true;
					}
					return _parentId;
				};

				that._fromDto = function (dto) {
					return fromDto(dto);
				}

				that.isDirty = function () {
					return _isDirty;
				};

				that.toDto = function () {
					var dto = {
						id: _id,
						name: _name,
						parentId: _parentId
					}

					if (_funnyName) {
						dto.funnyName = _funnyName;
					}

					if (_imageFile) {
						dto.imageFile = _imageFile;
					}

					return dto;
				}

				function fromDto(dto) {
					_id = dto.id;
					_parentId = dto.parentId;
					_name = dto.name;
					_funnyName = dto.funnyName;
					_imageId = dto.imageId;
					_imageFile = null;
					_isDirty = false;
					return this;
				}
			}

			// Static Properties

			ItemPreset.build = function (data) {
				return new ItemPreset(data);
			};

			ItemPreset.responseTransformer = function (data) {
				if (angular.isArray(data)) {
					return data
						.map(ItemPreset.build)
						.filter(Boolean);
				}
				return ItemPreset.build(data);
			};

			return ItemPreset;
		}
	]);