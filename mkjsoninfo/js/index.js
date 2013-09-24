function trans(){
	var text = $("#indata").val();
	var jdata = mkJson(text);
	$("#outdata").val(JSON.stringify(jdata));
}

function mkJson(text){
	var data = {
	    locId : "",
	    svg : "",
	    linked : [],
	    info : []
	};
	
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
		data.info.push(info);
	}
	
	return data;
}