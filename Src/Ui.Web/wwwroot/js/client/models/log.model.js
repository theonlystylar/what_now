angular.module("clientApp.modelsModule")
	.factory("Log", [
		function() {

			function Log(itemId) {
				var that = this,
					_id = null,
					_itemId = itemId,
					_dateTimeOverride,
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

				that.setDateTimeOverride = function(date) {
					_dateTimeOverride = date;
				}

				that.toDto = function() {
					var dto = {
						itemId: _itemId,
						controlLogs: _controlLogs
					}

					if (_dateTimeOverride) {
						dto.dateTimeOverride = _dateTimeOverride;
					}

					return dto;
				}
			}

			return Log;
		}
	]);