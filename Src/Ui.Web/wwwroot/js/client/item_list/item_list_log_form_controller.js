angular.module("itemListModule").controller(
	"itemListLogFormController", [
	"$scope",
	"controlService",
	function ($scope, controlService) {

		$scope.cancel = function () {
			alert("cancel");
		}

		$scope.save = function () {
			//alert("save");
			var form = {
				itemId: $scope.item.id,
				controls: []
			};
			form.controls.concat(getCheckboxControlForms());

			// iterate checkbox controls
			



			var x = form;

			//var checked = _.filter($scope.controls, function (control) {
			//		return _.where(control.ControlOptions, { checked: true }).length > 0
			//	}
			//)

			//_.each(checked, function (check) {
			//	var control = {
			//		id: check.id
			//	}

			//	form.controls.push(control);
			//})

			//_.each($scope.controls, function (control) {
			//	switch (control.controlType.name) {
			//		case "Checkbox":
						
			//			var checked = [];
			//			_.each(control.controlOptions, function (controlOption) {
			//				if (controlOption.checked) {
			//					checked.push({
			//						id: controlOption.id
			//					})
			//				}
			//				//alert(controlOption.checked);
			//				//form.logOptions.push({
			//				//	controlOptionId: controlOption.id
			//				//})
			//			})
			//			if (checked.length > 0) {
			//				form.controls.push({
			//					id: control.id
			//				})
			//			}
			//			break;
			//		case "Textbox":
			//			//alert(control.value);
			//			//logOptions.push({
			//			//	controlOptionId: controlOption.id
			//			//})
			//			break;
			//		default:
			//			throw error("Code is not set to handle this control type")
			//	}
			//})

			// save form to db
		}
		
		$scope.subscribe('ITEM_SELECTED', function (item) {
			$scope.controls = 0;
			if (item && item.children.length == 0) {
				loadControls(item);
			}
		});

		function getCheckboxControlForms() {
			var controls = _.filter($scope.controls, function (control) {
				return control.controlType.name === "Checkbox";
			})
			_.each(controls, function (control) {

			})
		}

		function loadControls(item) {
			$scope.item = item;
			controlService.query({ itemId: item.id }, function (controls) {
				$scope.controls = controls;
			})
		}
	}
	]);