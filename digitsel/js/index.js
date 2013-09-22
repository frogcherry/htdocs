var DIGIT_CNT = 1;
var SPACING = 50;
var SCALE = 1.0;
var dSpace = 5.0;
var dScale = 0.8;

var _dsp = 5;
var _hidden_opacity = 0.1;
var _hidden_on = 0.6;
var _show_opacity = 1.0;
var _show_on = 0.8;

var _DIGIT_HTML = '		<g transform="translate(51.0236,-779.528)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d0"/>		</g>		<g transform="translate(874.488,44.0787) rotate(90)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d1"/>		</g>		<g transform="translate(1028.83,44.7874) rotate(90)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d2"/>		</g>		<g transform="translate(50.2441,-624.898)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d3"/>		</g>		<g transform="translate(873.78,198.496) rotate(90)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d4"/>		</g>		<g transform="translate(1028.13,199.205) rotate(90)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d5"/>		</g>		<g transform="translate(49.5354,-470.622)">			<path d="M0 823.46 L28.09 806.46 L126.4 806.46 L154.49 824.17 L126.4 841.89 L28.09 841.89 L0 823.46 Z" 			class="digit d6"/>		</g>';
var _DIGIT_WIDTH = 192;

function fitSVGSize(){
	var docVis = document.querySelector("svg");
    var docVisBox = docVis.getBBox();
    d3.select("svg")
	    .attr("width", docVisBox.x + docVisBox.width+10)
	    .attr("height", docVisBox.y + docVisBox.height+10);
}

function adjustSpace(){
	for ( var i = 1; i < DIGIT_CNT; i++) {
		var dx = i * (_DIGIT_WIDTH + SPACING);
		var g = d3.select(".all_digit .digit_"+i)
			.attr("transform", "translate(" + dx + ", 0)")
			;
	}
}

function addSpace(){
	SPACING += dSpace;
	adjustSpace();
	fitSVGSize();
}

function removeSpace(){
	if (SPACING < dSpace) {
		return;
	}
	SPACING -= dSpace;
	adjustSpace();
	fitSVGSize();
}

function zoomin(){
	SCALE = SCALE / dScale;
	d3.select(".all_digit")
		.attr("transform", "scale(" + SCALE + ")");
	fitSVGSize();
}

function zoomout(){
	SCALE = SCALE * dScale;
	d3.select(".all_digit")
		.attr("transform", "scale(" + SCALE + ")");
	
	fitSVGSize();
}

function bindDigitUI(){
	d3.selectAll(".digit").on("click", function(){
		var it = d3.select(this);
		var state = parseFloat(it.style("opacity"));
		if (state < _show_on) { // hidden
			it.style("opacity", _show_opacity);
		} else { //shown
			it.style("opacity", _hidden_opacity);
		}
	});
	
	d3.selectAll(".digit").on("mouseover", function(){
		var it = d3.select(this);
		var state = parseFloat(it.style("opacity"));
		if (state < _show_on) { // hidden
			it.style("opacity", _hidden_on);
		} else { //shown
			it.style("opacity", _show_on);
		}
	});
	
	d3.selectAll(".digit").on("mouseout", function(){
		var it = d3.select(this);
		var state = parseFloat(it.style("opacity"));
		if (state < _show_on) { // hidden
			it.style("opacity", _hidden_opacity);
		} else { //shown
			it.style("opacity", _show_opacity);
		}
	});
}

function addDigit(){
	var dx = DIGIT_CNT * (_DIGIT_WIDTH + SPACING);
	var g = d3.select(".all_digit")
		.append("g")
		.classed("digit_"+DIGIT_CNT, true)
		;
	DigitSVG.make(g)
		.attr("transform", "translate(" + dx + ", 0)")
		;
	bindDigitUI();
	
	DIGIT_CNT += 1;
	
	$(".digit_cnt").text(DIGIT_CNT);
	fitSVGSize();
}

function removeDigit(){
	if (DIGIT_CNT<2) {
		return;
	}
	
	d3.select(".digit_"+(DIGIT_CNT-1))
		.remove();
	
	DIGIT_CNT -= 1;
	
	$(".digit_cnt").text(DIGIT_CNT);
	fitSVGSize();
}

$(document).ready(function(){
	bindDigitUI();
});

