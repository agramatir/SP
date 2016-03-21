

var checkBnf = function()
{
	bnf =
{
	"program": {
		"label" : "<program>",
		"children" : [
			["begin", "statement", "end"]
		],
		"isTerminal" : false,
		"isValue" : false
	},
	"statement": {
		"label" : "<statement>",
		"children" : [
			["variable", ":=", "expression"],
			["statement", ";", "statement"],
			["if", "condition", "then","statement","else","statement"],
			["while","condition","do","statement"],
			["skip"]
		],
		"isTerminal" : false,
		"isValue" : false
	},
	"expression": {
		"label" : "<expression>",
		"children" : [
			["number"],
			["variable"],
			["expression","+","expression"],
			["expression","-","expression"],
			["expression","*","expression"],
			["(","expression",")"]
		],
		"isTerminal" : false,
		"isValue" : false
	},
	"condition": {
		"label" : "<condition>",
		"children" : [
			["condition","=","condition"],
			["condition",">","condition"],
			["condition","v","condition"],
			["condition","!","condition"],
			["(","condition",")"]

		],
		"isTerminal" : false,
		"isValue" : false
	},
	"variable": {
		"label" : "<variable>",
		"children" : [
		],
		"isTerminal" : false,
		"isValue" : true
	},
	"number": {
		"label" : "<number>",
		"children" : [
		],
		"isTerminal" : false,
		"isValue" : true
	},
	"begin" : {
		"label" : "begin",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"end" : {
		"label" : "end",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"if" : {
		"label" : "if",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"then" : {
		"label" : "then",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"else" : {
		"label" : "else",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"while" : {
		"label" : "while",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"do" : {
		"label" : "do",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"skip" : {
		"label" : "skip",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"+" : {
		"label" : "+",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"-" : {
		"label" : "-",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"*" : {
		"label" : "*",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"(" : {
		"label" : "(",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	")" : {
		"label" : ")",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},
	"=" : {
		"label" : "=",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},

	">" : {
		"label" : ">",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},

	"v" : {
		"label" : "v",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},

	"!" : {
		"label" : "!",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},


	":=" : {
		"label" : ":=",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	},

	";" : {
		"label" : ";",
		"children" : [
		],
		"isTerminal" : true,
		"isValue" : false
	}

};

	var result = true;
	terminals = [];
	nonterminals = [];
	values = [];

	for (var key in bnf) {
		if (bnf[key].isTerminal) {
			if (!(key in terminals)) {
				terminals.push(key);
			}
		}
		else {
			if (!(key in nonterminals)) {
				nonterminals.push(key);	
			}
		}

		if (bnf[key].isValue) {
			values.push(key);
		}
	}


	for (var key in bnf) {
		if (!bnf[key].isTerminal) {
			for (var i in bnf[key].children) {
				for (var j in bnf[key].children[i]) {
					var child = bnf[key].children[i][j];
					if (!(child in bnf)) {
						console.log("Error: "+child+" is the part of "+key+" but not defined in bnf");
						result = false;
					}
				}
			}
		}
	}

	console.log(terminals);
	console.log(nonterminals);
	console.log(values);
	return result;
}

//checkBnf();