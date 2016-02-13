angular.module("clientApp.logDetailModule")
	.controller(
		"logDetailController", [
			"$scope",
			"logDetailData",
			function($scope, logDetailData) {

				initialize();

				$scope.deleteLog = function (logDetail) {
					if (confirm("Delete " + logDetail.item + " : " + logDetail.value)) {
						logDetailData.deleteControlLog(logDetail.logId, logDetail.controlLogId).then(function() {
							setLogDetails();
						});
					}
				}

				function initialize() {
					setLogDetails();
				}

				function setLogDetails() {
					logDetailData.getAll().then(function(logDetails) {
						_.each(logDetails, function(logDetail) {
							logDetail.loggedLocalTime = moment.utc(logDetail.logged).toDate();
						});
						$scope.logDetails = logDetails;
					});
				}
			}
		]);