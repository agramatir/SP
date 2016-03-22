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
	var raw = '{"program":{"label":"<program>","type":"nonterminal","children":[["begin","statement","end"]]},"statement":{"label":"<statement>","type":"nonterminal","children":[["variable",":=","expression"],["statement",";","statement"],["if","condition","then","statement","else","statement"],["while","condition","do","statement"],["skip"]]},"expression":{"label":"<expression>","type":"nonterminal","children":[["number"],["variable"],["expression","+","expression"],["expression","-","expression"],["expression","*","expression"],["(","expression",")"]]},"condition":{"label":"<condition>","type":"nonterminal","children":[["expression","=","expression"],["expression",">","expression"],["condition","v","condition"],["!","condition"],["(","condition",")"]]},"variable":{"label":"<variable>","type":"nonterminal","children":[["text"]]},"number":{"label":"<number>","type":"nonterminal","children":[["num"]]},"begin":{"label":"begin","type":"terminal","children":[]},"end":{"label":"end","type":"terminal","children":[]},"if":{"label":"if","type":"terminal","children":[]},"then":{"label":"then","type":"terminal","children":[]},"else":{"label":"else","type":"terminal","children":[]},"while":{"label":"while","type":"terminal","children":[]},"do":{"label":"do","type":"terminal","children":[]},"skip":{"label":"skip","type":"terminal","children":[]},"+":{"label":"+","type":"terminal","children":[]},"-":{"label":"-","type":"terminal","children":[]},"*":{"label":"*","type":"terminal","children":[]},"(":{"label":"(","type":"terminal","children":[]},")":{"label":")","type":"terminal","children":[]},"=":{"label":"=","type":"terminal","children":[]},">":{"label":">","type":"terminal","children":[]},"v":{"label":"v","type":"terminal","children":[]},"!":{"label":"!","type":"terminal","children":[]},":=":{"label":":=","type":"terminal","children":[]},";":{"label":";","type":"terminal","children":[]},"text":{"label":"value","type":"variable","children":[]},"num":{"label":"value","type":"number","children":[]}}';
	var bnf = angular.fromJson(raw);
	
	var data = [
		{
			label: 'program',
			type: 'nonterminal',
			children: []
		}];
	var versions = [JSON.stringify(data)];

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
		bnf: bnf,

		addNewVersion: function()
		{
			versions.push(JSON.stringify(data));
		},

		rollback: function() 
		{
			console.log(versions);
			if (versions.length==1) {
				return data;
			}

			versions.pop();
			data = JSON.parse(versions[versions.length-1]);
			return data;
		}
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