angular.module("clientApp.logDetailModule")
	.controller(
		"logDetailController", [
			"$scope",
			"logDetailDataService",
			function($scope, logDetailDataService) {

				initialize();

				$scope.deleteLog = function (logDetail) {
					if (confirm("Delete " + logDetail.item + " : " + logDetail.value)) {
						logDetailDataService.deleteControlLog(logDetail.logId, logDetail.controlLogId).then(function() {
							setLogDetails();
						});
					}
				}

				function initialize() {
					setLogDetails();
				}

				function setLogDetails() {
					logDetailDataService.getAll().then(function(logDetails) {
						_.each(logDetails, function(logDetail) {
							logDetail.loggedLocalTime = moment.utc(logDetail.logged).toDate();
						});
						$scope.logDetails = logDetails;
					});
				}
			}
		]);