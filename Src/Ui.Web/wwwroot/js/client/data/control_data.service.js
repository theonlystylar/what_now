angular.module("dataModule")
	.factory("controlDataService", [
		"$http",
		function($http) {

			function getAll() {
				return $http.get("api/controls", { cache: "true" }).then(function(response) {
					return response.data;
				});
			}

			function getByItem(itemId) {
				return where({ itemId: itemId });
			}

			function where(propertyFilter) {
				return getAll().then(function(data) {
					return _.where(data, propertyFilter);
				});
			}

			return {
				getByItem: getByItem
			};
		}
	]);