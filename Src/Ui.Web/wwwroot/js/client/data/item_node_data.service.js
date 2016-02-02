angular.module("dataModule")
	.factory("itemNodeDataService", [
		"$http",
		"$timeout",
		"$q",
		function ($http, $timeout, $q) {

			var _nodes;

			function get(id) {
				return findWhere({ id: id });
			}

			function getAll() {
				if (_nodes) {
					var defer = $q.defer();
					$timeout(function () {
						defer.resolve(_nodes);
					});
					return defer.promise;
				}
				//return $http.get("api/items/nodes", { cache: "true" }).then(function (response) {
				return $http.get("api/items/nodes").then(function (response) {
					_nodes = response.data;
					return _nodes;
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