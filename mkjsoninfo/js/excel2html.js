function trans(){
	var text = $("#indata").val();
	var htmlData = mkHtml(htmlEscape(text));
	$("#outdata").val(htmlData);
}

function htmlEscape(text) {
	return text.replace(/[<>]/g, function(match, pos, originalText){
		switch (match) {
		case "<":
			return "&lt;";
		case ">":
			return "&gt;";
		default:
			return match;
		}
	});
};

function mkHtml(text){
	var data = "";
	
	var rows = text.split("\n");
	for (var i = 1; i<rows.length; i++) {
		var items = rows[i].split("\t");
		if (items.length < 3) {
			continue;
		}
		var info = {
			name : 	items[0],
			summary : items[1],
			detail : items[2]
		};
		data = data 
			+ "<h3>" + info.name + "：&nbsp;&nbsp;&nbsp;&nbsp;" + info.summary + "</h3>\n"
			+ "<p>" + info.name + "：" + info.detail + "</p>\n";
	}
	
	return data;
}