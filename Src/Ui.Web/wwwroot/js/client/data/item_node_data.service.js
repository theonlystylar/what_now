angular.module("dataModule")
	.factory("itemNodeDataService", [
		"$q",
		"$http",
		function($q, $http) {

			function get(id) {
				return where({ id: id });
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

			return {
				get: get,
				getChildren: getChildren
			};
		}
	]);