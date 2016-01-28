angular.module("itemListModule").controller(
	"itemListButtonEditorController", [
		"$scope",
		function ($scope) {

			$scope.cancel = function() {
				$scope.$parent.hideChangeForm();
			}
		}
	]);