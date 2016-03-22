angular
	.module('spLab')
	.directive('programCode', function()
	{
		var writeNode = function(node,parentJQuery,depth) {
	      var s = "";
	      if (node.children.length==0)
	        s = node.label;
	      var div = angular.element("<span>").html(s+" ");
	      parentJQuery.append(div);

	      //console.log([node.label,parentJQuery.html()]);

	      for (var i = 0; i < node.children.length; ++i) {
	        var qqqwer = depth+1;
	        writeNode(node.children[i],div,qqqwer);
	      }
	      if (node.label.search("statement") != -1) {
	        div.before("<br/>");
	        div.css("padding-left", depth+"em");
	      }
	      if (node.label.search("end") != -1) {
	        div.before("<br/>");
	      }

	      if (node.label.search("number") != -1) {
	      	div.css("color", 'purple');
	        //div.attr.style += ";color:purple;";
	      }

	      if (node.type == "terminal") {
	      	div.css("font-weight", 'bold');
	        //div.attr.style += ";font-weight: bold;";
	      }

	    }
		return {
			restrict: 'A',
			scope: {
				data: '='
			},
			link: function(scope, element, attrs)
			{
				scope.$watch('data', function()
				{
					if(element)
					{
						angular.forEach(element.children(), function(value, key){
							value.remove();
						});
					}
					scope.data.forEach(function (node) {
				      writeNode(node, element, 0 );
				    });

				}, true);

			}
		}
	})
	.directive('treeGraph', function($timeout)
	{
		var renderGraph = function(data, bnf) {

        $("#svg-canvas").empty();

        
        var nodes = {};
        var edges = [];


        var populate = function(vertex, nodes, edges) {
          var nodeID = Object.keys(nodes).length;

          var newNode = {
            label: vertex.label,
            id: nodeID + ""
          };

          var classes = [];
          if (vertex.type) {
            classes.push("node-type-" + vertex.type);
          }

          newNode.nodeclass = classes.join(" ");

          nodes[nodeID] = newNode;

          vertex.children.forEach(function (child) {
            var newChild = populate(child, nodes, edges);

            edges.push({
              source: newNode.id,
              target: newChild.id,
              id: newNode.id + "-" + newChild.id
            });

          });

          return newNode;
        }

        data.forEach(function (e) {
          populate(e, nodes, edges);
        });

        var g = new dagreD3.graphlib.Graph()
            .setGraph({})
            .setDefaultEdgeLabel(function () {
              return {};
            });

        for (var key in nodes) {
          var node = nodes[key];
          g.setNode(node.id, {
            label: bnf[node.label].label,
            class: node.nodeclass,
            //  round edges
            rx: 5,
            ry: 5
          });
        }

        edges.forEach(function (e) {
          g.setEdge(e.source, e.target, {
            lineTension: .8,
            lineInterpolate: "bundle"
          });
        });

        var render = new dagreD3.render();

        var svg = d3.select("#svg-canvas"),
            svgGroup = svg.append("g");

        render(d3.select("#svg-canvas g"), g);

        var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
        svg.attr("height", g.graph().height + 40);

        //  enable zoom and scrolling
        svgGroup.attr("transform", "translate(5, 5)");
        svg.call(d3.behavior.zoom().on("zoom", function redraw() {
          svgGroup.attr("transform",
              "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
        }));
  }

		return {
			restrict: 'A',
			scope: {
				data: '=',
				indicator: '=',
				bnf: '='
			},
			link: function(scope, element, attrs)
			{
				scope.$watch('data', function()
				{
					
						renderGraph(scope.data, scope.bnf);
					

				}, true);
				scope.$watch('indicator', function()
				{
					$timeout(function()
					{
						renderGraph(scope.data, scope.bnf);
					}, 10);
					

				});

			}
		}

	})
	.directive('uploadfile', function ($timeout) {
        return {
          restrict: 'A',
          link: function(scope, element) {

            element.bind('click', function(e) {
            	angular.element('#upload-container').find('#upload').trigger('click');
            });
          }
        };
    })
    .directive("fileread", [function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                        var ind = scope.fileread.indexOf("base64,");
	                        if (ind>=0)
	                        	scope.fileread = scope.fileread.substr(ind+7);
	                        scope.fileread = angular.fromJson(atob(scope.fileread));
	                    });
	                }
	                reader.readAsDataURL(changeEvent.target.files[0]);
	            });
	        }
	    }
	}]);