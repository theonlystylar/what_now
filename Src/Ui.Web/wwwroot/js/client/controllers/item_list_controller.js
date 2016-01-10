var clientAppControllers = angular.module("clientAppControllers");

clientAppControllers.controller(
	"ItemListController", [
	"$scope",
	"$location",
	"$routeParams",
	"$window",
	"ItemLogService",
	"ItemQueryService",
	function ($scope, $location, $routeParams, $window, itemLogService, itemQueryService) {

		var parentId = $routeParams.parentId;

		if (parentId) {
			itemQueryService.getChildren(parentId, function (data) {
				$scope.items = data;
			})
		} else {
			itemQueryService.getRoot(function (data) {
				$scope.items = data;
			})
		}

		$scope.hasParent = parentId > 0;

		$scope.back = function () {
			$window.history.back();
		};

		$scope.onClick = function (item) {
			if (item.hasChildren) {
				$location.path("items/" + item.id)
				return;
			}
			itemLogService.save({
				itemId: item.id
			},
			// success
			function () {
				toastr["success"]('Logged ' + item.name);
			},
			// error
			function (error) {
				toastr["error"]('Error!');
			});
		};
	}
]);