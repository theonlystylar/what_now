angular.module("clientApp.modelsModule")
	.factory("ControlOption", [
		function () {

			function ControlOption(data) {
				var that = this,
					_id = data.id,
					_name = data.name,
					_funnyName = data.funnyName;

				that.getId = function () {
					return _id;
				}

				that.getDisplayName = function () {
					return _funnyName || _name;
				}
			}

			// Static Properties

			ControlOption.build = function (data) {
				return new ControlOption(data);
			}

			ControlOption.responseTransformer = function (data) {
				if (angular.isArray(data)) {
					return data
						.map(ControlOption.build)
						.filter(Boolean);
				}
				return ControlOption.build(data);
			}

			return ControlOption;
		}
	]);