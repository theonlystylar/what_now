angular.module("dataModule")
	.factory("itemDataService", [
		"$http",
		"$timeout",
		"$q",
		"Item",
		function($http, $timeout, $q, Item) {

			return {
				get: function() {
					return $http
						.get("api/items/nodes")
						.then(function(response) {
							var defer = $q.defer();
							$timeout(function() {
								defer.resolve(response.data);
							});
							return defer.promise;
						})
						.then(Item.responseTransformer);
				}
			}
		}
	]);