var clientAppControllers = angular.module("clientAppControllers");

clientAppControllers.controller("ItemListController", [
	"$scope", "ItemLogService", "ItemQueryService", function ($scope, itemLogService, itemQueryService) {
		itemQueryService.getRoot(function (data) {
			$scope.items = data;
		})

		$scope.onClick = function (item) {
			itemLogService.save({
				itemId: item.id,
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