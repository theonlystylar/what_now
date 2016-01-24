angular.module("navBarModule").directive(
	"navBar",
	function () {
		return {
			restrict: "E",
			scope: {
				tabName: "=tabName"
			},
			templateUrl: "js/client/nav_bar/nav_bar.template.html",
			controller: "NavBarController"
		}
	}
);