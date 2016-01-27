angular.module("clientApp.pagesModule")
	.controller(
		"trackStuffPageController", [
			"$scope",
			function ($scope) {

				$scope.editing = false;

				$scope.subscribe("EDIT_ON", function() {
					$scope.editing = true;
				});

				$scope.subscribe("EDIT_OFF", function () {
					$scope.editing = false;
				});
			}
		]);