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

		loadItems();

		function loadItems(parentId) {
			if (parentId) {
				itemQueryService.getChildren(parentId, function (data) {
					$scope.items = data;
				})
			} else {
				itemQueryService.getRoot(function (data) {
					$scope.items = data;
				})
			}
		}

		$scope.hasParent = parentId > 0;

		$scope.back = function () {
			$window.history.back();
		};

		$scope.pageToChildren = function (item) {
			if (item.hasChildren) {
				loadItems(item.id);
				//$location.path("items/" + item.id)
				return;
			}
			$location.path("items/log/" + item.id)
		}

		$scope.log = function (item) {
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
		}
	}
	]);