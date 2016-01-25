angular.module("clientApp.logDetailModule").directive(
	"logDetail",
	function () {
		return {
			restrict: "E",
			scope: {},
			templateUrl: "js/client/log_detail/log_detail.template.html",
			controller: "logDetailController"
		}
	}
);