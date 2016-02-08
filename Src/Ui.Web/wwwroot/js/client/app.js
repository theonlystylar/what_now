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
	"clientApp.pagesModule",
	"clientApp.logDetailModule",
	"clientApp.modelsModule",
	"clientApp.controls"
]);

clientApp.config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.
			when("/itemexplorer", {
				templateUrl: "js/client/pages/item_explorer_page.template.html",
				controller: "itemExplorerPageController"
			}).
			when("/trackstuff", {
				templateUrl: "js/client/pages/track_stuff_page.template.html",
				controller: "trackStuffPageController"
			}).
			when("/seestuff", {
				templateUrl: "js/client/pages/see_stuff_page.template.html",
				controller: "seeStuffPageController"
			}).
			otherwise({
				redirectTo: "/itemexplorer"
			});
	}
]);