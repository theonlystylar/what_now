angular.module("clientApp.modelsModule")
	.factory("logManager", [
		"$timeout",
		"logData",
		"Log",
		function($timeout, logData, Log) {

			function create(itemId) {
				return new Log(itemId);
			}

			function save(log) {
				return logData.save(log.toDto()).$promise;
			}

			return {
				create: create,
				save: save
			}
		}
	]);