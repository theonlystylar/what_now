"use strict";

/* App Module */

var clientApp = angular.module("clientApp", [
	"ngRoute",
	"ngAnimate",
	"kendo.directives",
	"core",
	"dataModule",
	"navBarModule",
	"itemListModule",
	"clientApp.pagesModule"
]);

clientApp.config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.
			when("/items", {
				templateUrl: "js/client/pages/track_stuff_page.template.html",
				controller: "trackStuffPageController"
			}).
			otherwise({
				redirectTo: "/items"
			});
	}
]);