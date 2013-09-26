var ACCEPT_ZOOM = true;


$(document).ready(function(){
	$("#menu .li1").addClass("current_page_item");
	$("#three-column .svg-container").bind("mousewheel", zoomSvg);
	$("#three-column .svg-container").bind("DOMMouseScroll", zoomSvg);
	
	showCTMap();
});

function navTo(id){
	// effect
	$("#menu li").removeClass("current_page_item");
	$("#menu .li"+id).addClass("current_page_item");
	
	// nav
	switch (id) {
	case 1:
		showCTMap();
		break;
	default:
		showBuidingInfo();
		break;
	}
}

function showBuidingInfo(){
	ACCEPT_ZOOM = false;
	
	$("#three-column .svg-container")
		.html("<span style='font-size:65px;'>建设中。。。<span>");
	$("#page").hide();
	$("#portfolio").hide();
}

function showCTMap(){
	ACCEPT_ZOOM = true;
	
	$("#page").show();
	$("#portfolio").show();
	$("#three-column .svg-container").load("svgs/ct.svg");
	
//	d3.select("#three-column .svg-container svg")
//		.attr("");
	
}

function zoomSvg(event){
	if (!ACCEPT_ZOOM) {
		return;
	}
	
	var dt = event.wheelDelta?event.wheelDelta:-event.detail*40;
	console.log(dt);
}