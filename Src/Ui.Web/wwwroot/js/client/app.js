"use strict";

/* App Module */

var clientApp = angular.module("clientApp", [
	"ngRoute",
	"ngAnimate",
	"kendo.directives",
	"core",
	"dataModule",
	"navBarModule",
	"clientApp.pagesModule",
	"clientApp.logDetailModule",
	"clientApp.modelsModule",
	"clientApp.controls"
]);

clientApp.config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.
			when("/logstuff", {
				templateUrl: "js/client/pages/log_stuff_page.template.html",
				controller: "logStuffPageController"
			}).
			when("/quickpick", {
				templateUrl: "js/client/pages/quick_pick_page.template.html",
				controller: "quickPickPageController"
			}).
			when("/seestuff", {
				templateUrl: "js/client/pages/see_stuff_page.template.html",
				controller: "seeStuffPageController"
			}).
			otherwise({
				redirectTo: "/logstuff"
			});
	}
]);