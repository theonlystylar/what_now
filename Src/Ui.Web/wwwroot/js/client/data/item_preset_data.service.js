angular.module("dataModule")
	.factory("itemPresetData", [
		"$http",
		"$timeout",
		"$q",
		"ItemPreset",
		function($http, $timeout, $q, ItemPreset) {

			return {
				get: function() {
					return $http
						.get("api/itempresets")
						.then(function(response) {
							var defer = $q.defer();
							$timeout(function() {
								defer.resolve(response.data);
							});
							return defer.promise;
						})
						.then(ItemPreset.responseTransformer);
				}
			};
		}
	]);