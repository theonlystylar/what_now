"use strict";

/* App Module */

var clientApp = angular.module("clientApp", [
	"ngRoute",
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
			when("/items/:itemId", {
				templateUrl: "js/client/partials/item.html",
				controller: "ItemListController"
			}).
			otherwise({
				redirectTo: "/items"
			});
	}
]);