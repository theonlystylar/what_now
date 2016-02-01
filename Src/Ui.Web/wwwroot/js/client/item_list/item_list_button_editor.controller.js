angular.module("itemListModule").controller(
	"itemListButtonEditorController", [
		"$scope",
		"$timeout",
		"Upload",
		function ($scope, $timeout, Upload) {

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
				name: "",
				FunnyName: ""
			}

			$scope.data = "none";

			//$scope.save = function() {
			//	var fileReader = new FileReader();
			//	fileReader.onloadend = function(e) {
			//		$scope.data = e.target.result;
			//	};
			//	fileReader.readAsArrayBuffer($scope.icon);
			//};


			$scope.save = function(iconFile) {
				iconFile.upload = Upload.upload({
					url: "api/items",
					data: {
						id: $scope.$parent.selectedItem.id,
						name: $scope.item.name,
						funnyName: $scope.item.funnyName,
						file: iconFile
					}
				});
				iconFile.upload.then(function (response) {
					$timeout(function() {
						iconFile.result = response.data;
					});
				}, function(response) {
					if (response.status > 0)
						$scope.errorMsg = response.status + ": " + response.data;
				}, function(evt) {
					// Math.min is to fix IE which reports 200% sometimes
					iconFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			};
		}
	]);