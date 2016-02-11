angular.module("navBarModule").directive(
	"navBar",
	function () {
		return {
			restrict: "E",
			scope: {
				tabName: "=tabName",
				canEdit: "=canEdit"
			},
			templateUrl: "js/client/controls/nav_bar/nav_bar.template.html",
			controller: "NavBarController"
		}
	}
);