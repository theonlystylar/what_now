/*
 * From stackoverflow (see second answer)
 * Angular doesn't support onchange for input file.  Adding this directive as an attribute to the input will hook up
 * the onchange event to your controller.
 * http://stackoverflow.com/questions/17922557/angularjs-how-to-check-for-changes-in-file-input-fields/19647381#19647381
 * Example:
 * <input type="file" file-on-change="onFileChange" ng-model="file"/>
 */

angular.module("core").directive(
	"fileOnChange",
	function () {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				var onChangeHandler = scope.$eval(attrs.fileOnChange);
				element.bind("change", onChangeHandler);
			}
		}
	}
);