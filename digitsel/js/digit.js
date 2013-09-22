var _path_d = "M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z";

var DigitSVG = {
	make : function(g){
		var d0 = g.append("g")
			.attr("transform", "translate(51.0236,-779.528)")
			;
		d0.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d0", true)
			;
		var d1 = g.append("g")
			.attr("transform", "translate(874.488,44.0787) rotate(90)")
			;
		d1.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d1", true)
			;
		var d2 = g.append("g")
			.attr("transform", "translate(1028.83,44.7874) rotate(90)")
			;
		d2.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d2", true)
			;
		var d3 = g.append("g")
			.attr("transform", "translate(50.2441,-624.898)")
			;
		d3.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d3", true)
			;
		var d4 = g.append("g")
			.attr("transform", "translate(873.78,198.496) rotate(90)")
			;
		d4.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d4", true)
			;
		var d5 = g.append("g")
			.attr("transform", "translate(1028.13,199.205) rotate(90)")
			;
		d5.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d5", true)
			;
		var d6 = g.append("g")
			.attr("transform", "translate(49.5354,-470.622)")
			;
		d6.append("path")
			.attr("d", _path_d)
			.classed("digit", true)
			.classed("d6", true)
			;
		
		return g;
	},
};





