angular.module("itemListModule").controller(
	"itemListButtonsController", [
		"$scope",
		"$timeout",
		"itemNodeDataService",
		"navBarStateService",
		function ($scope, $timeout, itemNodeDataService, navBarStateService) {

			$scope.editing = navBarStateService.getEditing();

			initialize();

			function initialize() {
				$timeout(function () {
					// DOM has finished rendering
					// Need to wait until DOM is rendered before loading the items so the buttons are rendered
					// and the transition "bounce" is visible
					setItems();
				});
			}

			navBarStateService.subscribeToEditing($scope, function (event, args) {
				$scope.editing = args.editing;
				setItems();
			});

			$scope.onItemChange = function(item) {
				$scope.$parent.showChangeForm(item);
			}

			$scope.onItemSelect = function (item) {
				$scope.$parent.goToChildren(item);
			};

			$scope.$on("REFRESH_CHILD_ITEMS", function() {
				setItems();
			});

			function setItems() {
				var parentId = $scope.$parent.item == null ? null : $scope.$parent.item.id;
				itemNodeDataService.getChildren(parentId).then(function(items) {
					$scope.items = items;
				});
			};
		}
	]);