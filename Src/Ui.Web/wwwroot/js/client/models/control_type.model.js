angular.module("clientApp.modelsModule")
	.factory("ControlType", [
		function () {

			function ControlType(data) {
				var that = this,
					_name = data.name;

				that.getName = function () {
					return _name;
				}
			}

			// Static Properties

			ControlType.build = function (data) {
				return new ControlType(data);
			}

			ControlType.responseTransformer = function (data) {
				if (angular.isArray(data)) {
					return data
						.map(ControlType.build)
						.filter(Boolean);
				}
				return ControlType.build(data);
			}

			return ControlType;
		}
	]);