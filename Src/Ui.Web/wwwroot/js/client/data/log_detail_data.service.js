angular.module("dataModule")
	.factory("logDetailDataService", [
		"$http",
		function ($http) {

			function getAll() {
				return $http.get("api/logdetails").then(function (response) {
					return response.data;
				});
			}

			return {
				getAll: getAll
			};
		}
	]);