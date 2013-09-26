function navTo(id){
	$("#menu li").removeClass("current_page_item");
	
	$("#menu .li"+id).addClass("current_page_item");
}