angular.module("itemListModule").controller(
	"itemListLogFormController", [
	"$scope",
	"controlService",
	function ($scope, controlService) {


		controlService.query({ itemId: 2 }, function (controls) {
			$scope.controls = controls;
		})
	}
	]);