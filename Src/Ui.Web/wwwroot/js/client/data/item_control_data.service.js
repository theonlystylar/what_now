angular.module("dataModule")
	.factory("itemControlDataService", [
		"$http",
		"$timeout",
		"$q",
		"ItemControl",
		function($http, $timeout, $q, ItemControl) {

			return {
				get: function() {
					return $http
						.get("api/controls")
						.then(function(response) {
							var defer = $q.defer();
							$timeout(function() {
								defer.resolve(response.data);
							});
							return defer.promise;
						})
						.then(ItemControl.responseTransformer);
				}
			}
		}
	]);