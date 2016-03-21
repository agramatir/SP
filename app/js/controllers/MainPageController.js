angular
    .module('spLabControllers')
    .controller('MainPageController', ['$scope', 'Tree', MainPageController]);

function MainPageController ($scope, Tree)
{
	$scope.hello = "Hello World";
	$scope.data = Tree.data;
	$scope.equality = function(a, b)
	{
		if (a === undefined || b === undefined || a === null || b === null)
                return false;
           return a.$$hashKey == b.$$hashKey;
	};
	$scope.treeOptions = {
		multiSelection: false,
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
	        labelSelected: "md-raised md-primary"
	    },
	    equality: $scope.equality,
 	    templateUrl: 'partials/tree-control.html',
 	    isSelectable: function(node)
 	    {
 	    	if(node.type == 'terminal')
 	    		return false;
 	    	return true;
 	    }
	};


	$scope.showOptions = function(node, selected)
	{
		if(!selected)
		{
			$scope.showContext = false;
			$scope.showRemoveContext = false;
			$scope.selectedNode = new Object();
			return;
		}
		if(node.children.length > 0)
		{
			$scope.showRemoveContext = true;
			$scope.showContext = false;
			return;
		}
		if(node.type == 'variable' || node.type = 'number')
		{
			$scope.showEditContext;
		}
		$scope.showRemoveContext = false;
		$scope.selectedNode = node;
		$scope.context = Tree.getPossibleChildren(node.label);
		if(!$scope.context.length)
		{
			$scope.showContext = true;
			return;
		}
		$scope.showContext = true;
		$scope.selectedOption = $scope.context[0];
	};

	$scope.addNodes = function()
	{
		angular.forEach($scope.selectedOption, function(value, key){
			Tree.addNode($scope.selectedNode, value);
		});
		$scope.expandedNodes.push($scope.selectedNode);
		$scope.selectedNode = null;
		$scope.showContext = false;
	};

	$scope.expandedNodes = [];



	$scope.showContext = false;
	$scope.context = [];
    $scope.bnf = Tree.bnf;

}