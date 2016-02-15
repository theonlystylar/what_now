angular.module("dataModule")
	.factory("logDetailData", [
		"$http",
		function ($http) {

			function deleteLog(logId) {
				return $http.delete("api/logdetails/deletelog/" + logId).then(function (response) {
					return response;
				});
			}

			function deleteControlLog(controlLogId) {
				return $http.delete("api/logdetails/deletecontrollog/" + controlLogId).then(function(response) {
					return response;
				});
			}

			function get() {
				return $http.get("api/logdetails").then(function(response) {
					return response.data;
				});
			}

			return {
				deleteLog: deleteLog,
				deleteControlLog: deleteControlLog,
				get: get
			};
		}
	]);