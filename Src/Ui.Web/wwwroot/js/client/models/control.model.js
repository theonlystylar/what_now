angular.module("clientApp.modelsModule")
	.factory("ItemControl", [
		"ControlType",
		"ControlOption",
		function(ControlType, ControlOption) {

			function Control(data) {
				var that = this,
					_id = data.id,
					_itemId = data.itemId,
					_name = data.name,
					_funnyName = data.funnyName,
					_controlType = ControlType.responseTransformer(data.controlType),
					_controlOptions = ControlOption.responseTransformer(data.controlOptions);

				that.getControlType = function() {
					return _controlType;
				}

				that.getDisplayName = function() {
					return _funnyName || _name;
				}

				that.getId = function() {
					return _id;
				};

				that.getItemId = function() {
					return _itemId;
				};

				that.getControlType = function() {
					return _controlType;
				}

				that.getControlOptions = function() {
					return _controlOptions;
				}
			}

			// Static Properties

			Control.build = function(data) {
				return new Control(data);
			}

			Control.responseTransformer = function(data) {
				if (angular.isArray(data)) {
					return data
						.map(Control.build)
						.filter(Boolean);
				}
				return Control.build(data);
			}

			return Control;
		}
	]);