angular.module("clientApp.controls")
	.controller(
		"itemLogController", [
			"$scope",
			"$timeout",
			"itemExplorerState",
			"controlManager",
			"logManager",
			function($scope, $timeout, itemExplorerState, controlManager, logManager) {

				initialize();

				$scope.cancel = function() {
					back();
				}

				// TODO: move logic to a new factory called logManager
				$scope.save = function() {
					var log = logManager.create($scope.item.getId());
					logCheckboxSelections(log);
					logRadioSelections(log);
					logTextboxEntries(log);

					//var data = {
					//	itemId: $scope.item.getId(),
					//	controlLogs: getCheckboxControlForms()
					//		.concat(getTextboxControlForms())
					//		.concat(getRadioControlForms())
					//};

					// add datetime override if user provided
					if ($scope.dateTimeOverride != null && $scope.dateTimeOverride instanceof Date) {
						log.setDateTimeOverride($scope.dateTimeOverride);
						//data.dateTimeOverride = $scope.dateTimeOverride;
					}

					logManager
						.save(log)
						.then(
							// success
							function() {
								toastr["success"]("Logged " + $scope.item.getDisplayName() + " form");
								back();
							},
							// error
							function(error) {
								toastr["error"](error);
							});

					//logService.save(data,
					//	// success
					//	function() {
					//		toastr["success"]("Logged " + $scope.item.getDisplayName() + " form");
					//	},
					//	// error
					//	function(error) {
					//		toastr["error"](error);
					//	});

					//back();
				}

				$scope.selectDateTime = function(e) {
					// two way binding of the datetimepicker value doesn't 
					// appear to work so using event instead
					var datePicker = e.sender;
					$scope.dateTimeOverride = datePicker.value();
				};

				//#region event handling

				itemExplorerState.subscribeToNavigateBack($scope, back);

				//#endregion

				//#region private functions

				function back() {
					itemExplorerState.setSelectedItemToParent();
					itemExplorerState.setSelectedView("list");
				}

				function logCheckboxSelections(log) {
					var forms = [];
					_.each($scope.controls, function(control) {
						if (control.controlType.name === "Checkbox") {
							_.each(control.controlOptions, function(controlOption) {
								if (controlOption.checked) {
									log.addControlLog(control.id, controlOption.id);
									//forms.push({
									//	controlId: control.id,
									//	controlOptionId: controlOption.id,
									//	value: null
									//});
								}
							});
						}
					});
					return forms;
				}

				function logRadioSelections(log) {
					var forms = [];
					_.each($scope.controls, function(control) {
						if (control.controlType.name === "Radio" && control.value != undefined && control.value > 0) {
							log.addControlLog(control.id, control.value);
							//forms.push({
							//	controlId: control.id,
							//	controlOptionId: control.value,
							//	value: null
							//});
						}
					});
					return forms;
				}

				function logTextboxEntries(log) {
					var forms = [];
					_.each($scope.controls, function(control) {
						if (control.controlType.name === "Textbox" && control.value != undefined && control.value.length > 0) {
							log.addControlLog(control.id, null, control.value);
							//forms.push({
							//	controlId: control.id,
							//	controlOptionId: null,
							//	value: control.value
							//});
						}
					});
					return forms;
				}

				function initialize() {
					// HACK: Using $timeout to allow thread to finish DOM setup before returning
					// to loading the items.  This is needed so that transition style work as each
					// item is rendered in the DOM.
					$timeout(loadControls, 100);
					$scope.item = itemExplorerState.getSelectedItem();
					$scope.currentDate = new Date();
					$scope.dateTimeOverride = null;
				}

				function loadControls() {
					var controlModels = controlManager.getByItemId($scope.item.getId());
					$scope.controls = [];
					_.each(controlModels, function(control) {
						$scope.controls.push(control.toJson());
					});
				}

				//#endregion
			}
		]);