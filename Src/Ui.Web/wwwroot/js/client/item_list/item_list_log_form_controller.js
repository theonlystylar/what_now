angular.module("itemListModule").controller(
	"itemListLogFormController", [
		"$scope",
		"controlService",
		"logService",
		"itemNodeDataService",
		function($scope, controlService, logService, itemNodeDataService) {

			$scope.cancel = function() {
				$scope.publish("ITEM_NAV_TO_PARENT_REQUESTED", {});
			};

			$scope.save = function() {
				var form = {
					itemId: $scope.item.id,
					controlLogs: getCheckboxControlForms()
				};

				form.controlLogs = form.controlLogs
					.concat(getTextboxControlForms())
					.concat(getRadioControlForms());

				logService.save(form,
					// success
					function() {
						toastr["success"]("Logged " + $scope.item.name + " form");
					},
					// error
					function(error) {
						toastr["error"]("Error!");
					});

				$scope.publish("ITEM_NAV_TO_PARENT_REQUESTED", {});
			};

			$scope.subscribe("ITEM_SELECTED", function(item) {
				$scope.controls = 0;
				if (item == null) return;
				itemNodeDataService.getChildren(item.id).then(function (data) {
					if (data.length === 0) { // no children
						loadControls(item);
					}
				});
				//if (item && item.children.length === 0) {
				//	loadControls(item);
				//}
			});

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
				_.each($scope.controls, function (control) {
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

			function loadControls(item) {
				$scope.item = item;
				controlService.query({ itemId: item.id }, function(controls) {
					$scope.controls = controls;
				});
			}
		}
	]);