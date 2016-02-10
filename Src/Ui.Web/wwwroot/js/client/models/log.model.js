angular.module("clientApp.modelsModule")
	.factory("Log", [
		function() {

			function Log(itemId) {
				var that = this,
					_id = null,
					_itemId = itemId,
					_controlLogs = [];

				that.addControlLog = function(controlId, controlOptionId, value) {
					_controlLogs.push({
						controlId: controlId,
						controlOptionId: controlOptionId,
						value: value
					});
				}

				that.isNew = function() {
					return _id === null;
				}

				that.toDto = function() {
					return {
						itemId: _itemId,
						controlLogs: _controlLogs
					}
				}
			}

			return Log;
		}
	]);