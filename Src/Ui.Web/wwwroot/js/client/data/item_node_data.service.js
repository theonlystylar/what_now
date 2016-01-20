angular.module("dataModule")
	.factory("itemNodeDataService", [
		"$resource",
		function($resource) {

			var _nodes;

			function get(properties, callback) {
				getAll(function(data) {
					callback(_.where(data, properties));
				});
			}

			function getAll(callback) {
				if (_nodes) {
					callback(_nodes);
					return;
				}

				$resource("api/items/nodes").query({}, function (data) {
					_nodes = data;
					callback(_nodes);
				});
			};

			return {
				get: get
			};
		}
	]);