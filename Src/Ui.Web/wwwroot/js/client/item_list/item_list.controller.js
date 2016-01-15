angular.module("itemListModule").controller(
	"itemListController", [
	"$scope",
	function ($scope) {
		$scope.isListVisible = true;
		$scope.isFormVisible = false;

		$scope.goBack = function () {
			$scope.isListVisible = !$scope.isListVisible;
			$scope.isFormVisible = !$scope.isFormVisible;
		}
	}
	]);