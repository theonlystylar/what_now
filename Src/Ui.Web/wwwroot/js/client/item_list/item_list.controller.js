angular.module("itemListModule").controller(
	"itemListController", [
	"$scope",
	function ($scope) {

		$scope.item = null;

		$scope.subscribe('ITEM_SELECTED', function (item) {
			$scope.item = item;
		});

		$scope.goToParent = function () {
			$scope.publish('ITEM_NAV_TO_PARENT_REQUESTED', {});
		}
	}
	]);