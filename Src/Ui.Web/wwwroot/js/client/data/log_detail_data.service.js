angular.module("dataModule")
	.factory("logDetailData", [
		"$http",
		function($http) {

			function deleteControlLog(logId, controlLogId) {
				return $http.delete("api/logdetails/" + logId + "/" + controlLogId).then(function(response) {
					return response;
				});
			}

			function getAll() {
				return $http.get("api/logdetails").then(function(response) {
					return response.data;
				});
			}

			return {
				deleteControlLog: deleteControlLog,
				getAll: getAll
			};
		}
	]);