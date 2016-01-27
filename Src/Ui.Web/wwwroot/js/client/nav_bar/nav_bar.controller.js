angular.module("navBarModule").controller(
	"NavBarController", [
		"$scope",
		function($scope) {

			$scope.editing = false;

			$scope.toggleEditing = function() {
				if ($scope.editing) {
					$scope.editing = false;
					$scope.publish("EDIT_OFF", {});
				} else {
					$scope.editing = true;
					$scope.publish("EDIT_ON", {});
				}
			}
		}
	]);