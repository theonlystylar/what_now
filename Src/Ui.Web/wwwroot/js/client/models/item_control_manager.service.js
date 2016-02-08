angular.module("clientApp.modelsModule")
	.factory("itemControlManager", [
		"$timeout",
		"itemControlDataService",
		function ($timeout, itemControlDataService) {

			var _controls;

			function getByItemId(itemId) {
				return _.filter(_controls, function(control) {
					return control.getItemId() === itemId;
				});
			}

			function load() {
				return itemControlDataService
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