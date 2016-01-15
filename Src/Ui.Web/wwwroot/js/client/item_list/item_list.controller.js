angular.module("itemListModule").controller(
	"itemListController", [
	"$scope",
	function ($scope) {

		$scope.item = null;
		$scope.isButtonsVisible = true;
		$scope.isFormVisible = false;

		$scope.subscribe('ITEM_SELECTED', function (item) {
			$scope.item = item;
			$scope.isButtonsVisible = !($scope.isFormVisible = item && item.children.length == 0);
		});

		$scope.goToParent = function () {
			$scope.publish('ITEM_NAV_TO_PARENT_REQUESTED', {});
		}
	}
	]);