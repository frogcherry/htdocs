$(document).ready(function(){
	$("#menu .li1").addClass("current_page_item");
});

function navTo(id){
	// effect
	$("#menu li").removeClass("current_page_item");
	$("#menu .li"+id).addClass("current_page_item");
	
	// nav
	
}