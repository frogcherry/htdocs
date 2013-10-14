// meta data
var CtMapMetaData = {};

/**
 * 载入元数据
 */
function loadMetaData(callback){
	// load ct map meta data
	d3.csv("data/meta/ct.csv",
			function(d){return d;},
			function(error, rows){
				if (error) {
					showError();
					alert("系统错误!!" + error);
					return;
				}
				
				CtMapMetaData = {};
				// make key-vale
				for ( var i = 0; i < rows.length; i++) {
					var item = rows[i];
					CtMapMetaData[item.locId] = item;
				}
				// parse parent-children
				for ( var i = 0; i < rows.length; i++) {
					var item = rows[i];
					if (item.parent in CtMapMetaData) {
						if(!Array.isArray(CtMapMetaData[item.parent].children)){
							CtMapMetaData[item.parent].children = [];
						}
						CtMapMetaData[item.parent].children.push(item.locId);
					}
				}
				
				if (callback) {
					callback();
				}
			});
}