﻿angular.module("itemListModule").controller(
	"itemListLogFormController", [
		"$scope",
		"controlService",
		"logService",
		function($scope, controlService, logService) {

			$scope.cancel = function() {
				$scope.publish("ITEM_NAV_TO_PARENT_REQUESTED", {});
			};

			$scope.save = function() {
				var form = {
					itemId: $scope.item.id,
					controlLogs: getCheckboxControlForms()
				};
				form.controlLogs = form.controlLogs.concat(getTextboxControlForms());
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
				if (item && item.children.length === 0) {
					loadControls(item);
				}
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