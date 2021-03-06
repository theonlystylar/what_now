﻿angular.module("dataModule")
	.factory("itemData", [
		"$http",
		"$timeout",
		"$q",
		"Item",
		function($http, $timeout, $q, Item) {

			return {
				get: function() {
					return $http
						.get("api/items")
						.then(function(response) {
							var defer = $q.defer();
							$timeout(function() {
								defer.resolve(response.data);
							});
							return defer.promise;
						})
						.then(Item.responseTransformer);
				},
				
				save: function(dto) {
					return $http
						.post("api/items", dto)
						.then(function(response) {
							$q.when(response.data);
						});
				}
			}
		}
	]);