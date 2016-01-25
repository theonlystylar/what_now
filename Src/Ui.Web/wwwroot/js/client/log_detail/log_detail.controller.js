angular.module("clientApp.logDetailModule")
	.controller(
		"logDetailController", [
			"$scope",
			"logDetailDataService",
			function ($scope, logDetailDataService) {

				initialize();

				function initialize() {
					setLogDetails();
				}

				function setLogDetails() {
					logDetailDataService.getAll().then(function (logDetails) {
						$scope.logDetails = logDetails;
					});
				}
			}
		]);