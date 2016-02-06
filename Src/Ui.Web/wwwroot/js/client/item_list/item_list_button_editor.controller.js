angular.module("itemListModule").controller(
	"itemListButtonEditorController", [
		"$scope",
		"$timeout",
		"Upload",
		//"itemNodeDataService",
		function ($scope, $timeout, Upload /*, itemNodeDataService */) {

			//TODO: use itemManager instead of itemNodeDataService

			$scope.cancel = function() {
				$scope.$parent.hideChangeForm();
			};

			$scope.onFileChange = function(event) {
				var iconFile = "";
				var icon = null;
				if (event.target.files.length > 0) {
					icon = event.target.files[0];
					iconFile = event.target.files[0].name;
				}
				$scope.icon = icon;
				$scope.iconFile = iconFile;
				$scope.$apply();
			};

			$scope.item = {
				name: $scope.$parent.selectedItem.name,
				funnyName: $scope.$parent.selectedItem.funnyName
			}

			$scope.data = "none";

			$scope.save = function(iconFile) {

				var request = {
					url: "api/items",
					data: {
						id: $scope.$parent.selectedItem.id,
						name: $scope.item.name,
						file: iconFile
					}
				}

				if ($scope.item.funnyName) {
					request.data.funnyName = $scope.item.funnyName;
				}

				// TODO: only use this upload if there is a file
				iconFile.upload = Upload.upload(request);
				iconFile.upload.then(function (response) {
					$timeout(function() {
						//var item = $scope.$parent.selectedItem;
						itemNodeDataService.get(response.data.id).then(function (item)
						{
							if (item) {
								item.parentId = response.data.parentId;
								item.name = response.data.name;
								item.funnyName = response.data.funnyName;
								item.imageId = response.data.imageId;
								item.sortOrder = response.data.sortOrder;
							}
						});
						
						$scope.$parent.hideChangeForm();
						toastr["success"]($scope.item.name + " saved");
					});
				}, function(response) {
					if (response.status > 0) {
						var errorMsg = response.status + ": " + response.data;
						toastr["error"](errorMsg);
					}
				}, function(evt) {
					// Math.min is to fix IE which reports 200% sometimes
					iconFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			};
		}
	]);