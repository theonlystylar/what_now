angular.module("navBarModule")
	.factory("navBarStateService", [
		"$rootScope",
		function($rootScope) {

			var _editing = false;
			var _editingEventName = "NAV_BAR_IS_EDITING_CHANGED";

			function getEditing() {
				return _editing;
			}

			function setEditing(value) {
				_editing = value;
				publishOnEditing();
			}

			function toggleEditing() {
				setEditing(!getEditing());
			}

			function subscribeToEditing(scope, callback) {
				var handler = $rootScope.$on(_editingEventName, callback);
				scope.$on("$destroy", handler);
			}

			function publishOnEditing() {
				$rootScope.$emit(_editingEventName, { editing: _editing });
			}

			return {
				getEditing: getEditing,
				setEditing: setEditing,
				subscribeToEditing: subscribeToEditing,
				toggleEditing: toggleEditing
			};
		}
	]);