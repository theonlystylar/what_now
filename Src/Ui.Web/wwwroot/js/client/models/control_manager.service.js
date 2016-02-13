angular.module("clientApp.modelsModule")
	.factory("controlManager", [
		"$timeout",
		"itemControlData",
		function ($timeout, itemControlData) {

			var _controls;

			function getByItemId(itemId) {
				return _.filter(_controls, function(control) {
					return control.getItemId() === itemId;
				});
			}

			function load() {
				return itemControlData
					.get()
					.then(function(controls) {
						_controls = controls;
						return $timeout(function() {
							return;
						});
					});
			}

			return {
				getByItemId: getByItemId,
				load: load
			}
		}
	]);