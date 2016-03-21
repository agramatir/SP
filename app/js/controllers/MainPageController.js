angular
    .module('spLabControllers')
    .controller('MainPageController', ['$scope', MainPageController]);

function MainPageController ($scope)
{
	$scope.hello = "Hello World";

}