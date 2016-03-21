angular
    .module('manageFlatfinderControllers')
    .controller('MainPageController', ['$scope', MainPageController]);

function MainPageController ($scope)
{
	$scope.hello = "Hello World";

}