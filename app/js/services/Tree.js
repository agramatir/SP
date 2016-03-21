angular
    .module('spLabServices')
    .factory('Tree', ['$http', Tree])
    .factory('Node', [Node]);

function Tree($http)
{
	var bnf = null;
	/*$http.get('bnf.json').success(function(data) {
      bnf = data;
    });*/
	var raw = '{"program":{"label":"<program>","children":[["begin","statement","end"]],"isTerminal":false,"isValue":false},"statement":{"label":"<statement>","children":[["variable",":=","expression"],["statement",";","statement"],["if","condition","then","statement","else","statement"],["while","condition","do","statement"],["skip"]],"isTerminal":false,"isValue":false},"expression":{"label":"<expression>","children":[["number"],["variable"],["expression","+","expression"],["expression","-","expression"],["expression","*","expression"],["(","expression",")"]],"isTerminal":false,"isValue":false},"condition":{"label":"<condition>","children":[["condition","=","condition"],["condition",">","condition"],["condition","v","condition"],["condition","!","condition"],["(","condition",")"]],"isTerminal":false,"isValue":false},"variable":{"label":"<variable>","children":[],"isTerminal":false,"isValue":true},"number":{"label":"<number>","children":[],"isTerminal":false,"isValue":true},"begin":{"label":"begin","children":[],"isTerminal":true,"isValue":false},"end":{"label":"end","children":[],"isTerminal":true,"isValue":false},"if":{"label":"if","children":[],"isTerminal":true,"isValue":false},"then":{"label":"then","children":[],"isTerminal":true,"isValue":false},"else":{"label":"else","children":[],"isTerminal":true,"isValue":false},"while":{"label":"while","children":[],"isTerminal":true,"isValue":false},"do":{"label":"do","children":[],"isTerminal":true,"isValue":false},"skip":{"label":"skip","children":[],"isTerminal":true,"isValue":false},"+":{"label":"+","children":[],"isTerminal":true,"isValue":false},"-":{"label":"-","children":[],"isTerminal":true,"isValue":false},"*":{"label":"*","children":[],"isTerminal":true,"isValue":false},"(":{"label":"(","children":[],"isTerminal":true,"isValue":false},")":{"label":")","children":[],"isTerminal":true,"isValue":false},"=":{"label":"=","children":[],"isTerminal":true,"isValue":false},">":{"label":">","children":[],"isTerminal":true,"isValue":false},"v":{"label":"v","children":[],"isTerminal":true,"isValue":false},"!":{"label":"!","children":[],"isTerminal":true,"isValue":false},":=":{"label":":=","children":[],"isTerminal":true,"isValue":false},";":{"label":";","children":[],"isTerminal":true,"isValue":false}}';
	var bnf = angular.fromJson(raw);
	var data = [
		{
			label: 'program',
			type: 'nonterminal',
			children: []
		}];
	return {
		addNode: function(root, nodeLabel)
		{
			root.children.push({
				label: nodeLabel,
				type: bnf[nodeLabel].type,
				children: []
			});
		},
		getPossibleChildren: function(nodeLabel)
		{
			return bnf[nodeLabel].children;
		},
		data: data,
		bnf: bnf

	}

}

/*function Node()
{
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	};
	return {
		id: getRandomInt(0, 1000),
		children: [],
		data: {},
		setData: function(newData)
		{
			data = newData;
		},
		setLabel: function(newLabel)
		{
			label = newLabel;
		},
		addChild: function(node)
		{
			children.push(node);
		},
		init: function(newLabel, newData)
		{
			label = newLabel;
			data = newData;
		}
	}
}*/