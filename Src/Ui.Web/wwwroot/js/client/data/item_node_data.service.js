angular.module("dataModule")
	.factory("itemNodeDataService", [
		"$http",
		function($http) {

			function get(id) {
				return findWhere({ id: id });
			}

			function getAll() {
				return $http.get("api/items/nodes", { cache: "true" }).then(function(response) {
					return response.data;
				});
			}

			function getChildren(parentId) {
				return where({ parentId: parentId });
			}

			function where(propertyFilter) {
				return getAll().then(function(data) {
					return _.where(data, propertyFilter);
				});
			}

			// returns first instance found
			function findWhere(propertyFilter) {
				return getAll().then(function(data) {
					return _.findWhere(data, propertyFilter);
				});
			}

			return {
				get: get,
				getChildren: getChildren
			};
		}
	]);