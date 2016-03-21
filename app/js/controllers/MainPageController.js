angular
    .module('spLabControllers')
    .controller('MainPageController', ['$scope', 'Tree', MainPageController]);

function MainPageController ($scope, Tree)
{
	$scope.hello = "Hello World";
	$scope.data = Tree.data;
	$scope.treeOptions = {
	    nodeChildren: "children",
	    dirSelectable: true,
	    injectClasses: {
	        ul: "a1",
	        li: "a2",
	        liSelected: "a7",
	        iExpanded: "a3",
	        iCollapsed: "a4",
	        iLeaf: "a5",
	        label: "a6",
	        labelSelected: "a8"
	    }
	};

	$scope.showOptions = function(node, selected)
	{
		if(!selected)
		{
			$scope.showContext = false;
			return;
		}
		$scope.selectedNode = node;
		$scope.showContext = true;
		$scope.context = Tree.getPossibleChildren(node.label);
		$scope.selectedOption = $scope.context[0];
	};

	$scope.addNodes = function()
	{
		angular.forEach($scope.selectedOption, function(value, key){
			Tree.addNode($scope.selectedNode, value);
		});
	};



	$scope.showContext = false;
	$scope.context = [];
    $scope.bnf = Tree.bnf;

}