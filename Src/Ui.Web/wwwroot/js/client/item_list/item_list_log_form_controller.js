angular.module("itemListModule").controller(
	"itemListLogFormController", [
		"$scope",
		"$timeout",
		"controlDataService",
		"logService",
		function($scope, $timeout, controlDataService, logService) {

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
				$scope.$parent.back();
			};

			$scope.save = function() {
				var form = {
					itemId: $scope.item.id,
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
						toastr["success"]("Logged " + $scope.item.name + " form");
					},
					// error
					function(error) {
						toastr["error"](error);
					});

				$scope.$parent.back();
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
				var item = $scope.$parent.item;
				$scope.item = item;
				$scope.currentDate = new Date();
				$scope.dateTimeOverride = null;

				controlDataService.getByItem(item.id).then(function(controls) {
					$scope.controls = controls;
				});
			}
		}
	]);