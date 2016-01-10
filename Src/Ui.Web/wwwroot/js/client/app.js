"use strict";

/* App Module */

var clientApp = angular.module("clientApp", [
	"ngRoute",
	"ngAnimate",
	"clientAppControllers",
	"clientAppServices"
]);

clientApp.config([
	"$routeProvider",
	function($routeProvider) {
		$routeProvider.
			when("/items", {
				templateUrl: "js/client/partials/items.html",
				controller: "ItemListController"
			}).
			when("/items/:parentId", {
				templateUrl: "js/client/partials/items.html",
				controller: "ItemListController"
			}).
			otherwise({
				redirectTo: "/items"
			});
	}
]);