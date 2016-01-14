angular.module("navBarModule").directive(
	"navBar",
	function () {
		return {
			restrict: "E",
			templateUrl: "js/client/nav_bar/nav_bar.template.html",
			controller: "NavBarController"
		}
	}
);