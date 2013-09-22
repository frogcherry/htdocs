function trans(){
	var text = $("#indata").val();
	var jdata = mkJson(text);
}

function mkJson(text){
	var rows = text.split("\n");
	for ( var row in rows) {
		var items = row.split("\t");
	}
	alert(rows);
}