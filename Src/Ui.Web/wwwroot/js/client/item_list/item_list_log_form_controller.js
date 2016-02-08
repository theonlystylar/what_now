﻿angular.module("itemListModule").controller(
	"itemListLogFormController", [
		"$scope",
		"$timeout",
		"controlDataService",
		"logService",
		"itemListState",
		function($scope, $timeout, controlDataService, logService, itemListState) {

			initialize();

			function initialize() {
				$timeout(function() {
					// DOM has finished rendering
					// Need to wait until DOM is rendered before loading the items so the controls are rendered
					// and the transition "bounce" is visible
					setForm();
				});
			}

			// two way binding of the datetimepicker value doesn't appear to work so using event instead
			$scope.onDateTimeSelected = function(e) {
				var datePicker = e.sender;
				$scope.dateTimeOverride = datePicker.value();
			};

			$scope.cancel = function() {
				itemListState.setSelectedItemToParent();
				itemListState.setSelectedView(itemListState.viewEnum.buttons);
			};

			$scope.save = function() {
				var form = {
					itemId: $scope.item.getId(),
					controlLogs: getCheckboxControlForms()
				};

				form.controlLogs = form.controlLogs
					.concat(getTextboxControlForms())
					.concat(getRadioControlForms());

				// add datetime override if user provided
				if ($scope.dateTimeOverride != null && $scope.dateTimeOverride instanceof Date) {
					form.dateTimeOverride = $scope.dateTimeOverride;
				}

				logService.save(form,
					// success
					function() {
						toastr["success"]("Logged " + $scope.item.getDisplayName() + " form");
					},
					// error
					function(error) {
						toastr["error"](error);
					});

				itemListState.setSelectedItemToParent();
				itemListState.setSelectedView(itemListState.viewEnum.buttons);
			};

			function getCheckboxControlForms() {
				var forms = [];
				_.each($scope.controls, function(control) {
					if (control.controlType.name === "Checkbox") {
						_.each(control.controlOptions, function(controlOption) {
							if (controlOption.checked) {
								forms.push({
									controlId: control.id,
									controlOptionId: controlOption.id,
									value: null
								});
							}
						});
					}
				});
				return forms;
			}

			function getRadioControlForms() {
				var forms = [];
				_.each($scope.controls, function(control) {
					if (control.controlType.name === "Radio" && control.value != undefined && control.value > 0) {
						forms.push({
							controlId: control.id,
							controlOptionId: control.value,
							value: null
						});
					}
				});
				return forms;
			}

			function getTextboxControlForms() {
				var forms = [];
				_.each($scope.controls, function(control) {
					if (control.controlType.name === "Textbox" && control.value != undefined && control.value.length > 0) {
						forms.push({
							controlId: control.id,
							controlOptionId: null,
							value: control.value
						});
					}
				});
				return forms;
			}

			function setForm() {
				$scope.item = itemListState.getSelectedItem();
				$scope.currentDate = new Date();
				$scope.dateTimeOverride = null;

				controlDataService.getByItem($scope.item.getId()).then(function(controls) {
					$scope.controls = controls;
				});
			}
		}
	]);