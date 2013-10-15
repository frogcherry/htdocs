// ready
$(document).ready(function(){
	loadMetaData(function(){
		navTo(1);
		$(".tipPanel.navPath").smartFloat();
	});
	initFocusedEquipDialog();
});

// 点击顶端页面导航
function navTo(id){
	// effect
	$("#menu li").removeClass("current_page_item");
	$("#menu .li"+id).addClass("current_page_item");
	
	// nav
	switch (id) {
	case 1:
		showCTMap("ct");
		break;
	default:
		showBuidingInfo();
		break;
	}
}

// 显示空页面
function showBuidingInfo(){
	$("#three-column .svg-container")
		.html("<span style='font-size:65px;'>建设中。。。<span>");
	$("#page").hide();
	$("#portfolio").hide();
}

//显示错误空页面
function showError(){
	$("#three-column .svg-container")
		.html("<span style='font-size:65px;'>系统错误。。。<span>");
	$("#page").hide();
	$("#portfolio").hide();
}


////////////////////
// 第1页，空间布局
////////////////////
var CT_STATE = {
    CURRENT_ID: "",
    //DBLCLICK_LOCK: false
};

/**
 * 显示层次部件
 * @param id: 设备位置编号
 */
function showCTMap(id, callback){
	$("#page").show();
	$("#portfolio").show();
	CT_STATE.CURRENT_ID = id;

	var info = CtMapMetaData[id];
	// load img/svg part
	if (info.imgType == "svg") {
		putCTMapSvg(info);
	} else if (info.imgType == "img"){
		putCTMapImg(info);
	}
	var callState = 0;
	// load info part
	var infoPanel = d3.select("#page #box1 .content");
	infoPanel.html("");
	infoPanel.append("div")
		.classed("infotab-accordion-content", true);
	$.get(info.infoFile+"?v=1.03", function(infoData){// load the data every time
		$.get(info.model+"?v=1.03", function(modelData){
			var infomodel = infoData + modelData;
			var context = $("#page #box1 .content .infotab-accordion-content");
			context.html(infomodel);
			context.accordion({
				   collapsible: true,
				   active: false,
				   heightStyle: "content"
				   });
			if (callState>1) {
				if (callback) {
					callback();
				}
			} else {
				callState++;
			}
		});
	});
	
	// load path
	var navPanel = d3.select(".tipPanel.navPath");
	navPanel.html("");
	var items = info.path.split(";");
	for (var i = 0; i < items.length; i++) {
		var pid = items[i];
		var pname = CtMapMetaData[pid].name;
		if (i < items.length-1) {
			navPanel.append("a")
				.text(pname)
				.attr("href", "#")
				.attr("onclick", "showCTMap('" + pid + "')");
			navPanel.append("span")
				.text("  /  ");
		} else {
			navPanel.append("span")
				.text(pname);
		}
	}
	
	// load file list part
	var fileListCon = $("#page #box2 .content");
	fileListCon.load(info.fileList+"?v=1.03");
	
	//return;
	// load ref-img part
	var imgList = $("#portfolio .imgList");
	imgList.html("");
	var refImgs = info.imgs.split(";");
	for ( var i = 0; i < refImgs.length; i++) {
		var fileName = refImgs[i].split("/").pop();
		var imgHtml = '<li class="li_'+i+'"><a'
		+ ' title="' + fileName + '"'
		+ ' class="image image-full cursor_hand" href="'
		+ refImgs[i]+ '"><img src="'
		+ refImgs[i]+ '" alt="" /></a></li>';
		imgList.append(imgHtml);
	}
	
	setTimeout(function(){
		imgList.magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] 
			},
			zoom: {
				    enabled: true, 
				    duration: 300, 
				    easing: 'ease-in-out', 
				    opener: function(openerElement) {
				    	return openerElement.is('img') ? openerElement : openerElement.find('img');
				    }
			},

			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return  '<small>' + info.name + '</small>' + item.el.attr('title');
				}
			}
			});
		if (callState>1) {
			if (callback) {
				callback();
			}
		} else {
			callState++;
		}
	}, 200);
}

/**
 * 放置svg交互图
 * @param info 信息体
 */
function putCTMapSvg(info){
	$("#three-column .svg-container").load(info.imgUrl,
			function(){
		var rootG = 
			d3.select("#three-column .svg-container .root");
		var effectLayer = rootG.select(".effectLayer");
		// bind zoom behavior
		var zoom = d3.behavior.zoom()
			.scaleExtent([0.5, 8])
			.on("zoom", function(){
				effectLayer.attr("transform", "translate(" + d3.event.translate + ") "
						+ "scale(" + d3.event.scale + ")");
			}); // return zoom object
		rootG.call(zoom);
		
		// bind dbl-click to nav to next level
		rootG.selectAll(".optmask")
			.on("dblclick", function(){
//				CT_STATE.DBLCLICK_LOCK = true;
				var nextId = d3.select(this)
					.attr("id");
				console.log("dblclick# "+nextId);
				showCTMap(nextId);
			});
		
		// bind click to show focused equip's info
		rootG.selectAll(".optmask")
			.on("click", function(){
//				if (CT_STATE.DBLCLICK_LOCK) {
//					$(".focusedEquipDialog").dialog("close");
//					return;
//				}
				var nextId = d3.select(this)
					.attr("id");
				console.log("click# "+nextId);
				showFocusedInfo(nextId);
			});
		
		// close info dialog when open new svg info
		$(".focusedEquipDialog").dialog("close");
		// TODO: bind children UI behavior
	});
}

/**
 * 显示当前focus的设备信息，单击为focus事件
 * @param equipId
 */
function showFocusedInfo(equipId){
	if (CT_STATE.CURRENT_ID == equipId) {
		$(".focusedEquipDialog").dialog("close");
		return;
	}
	
	var info = CtMapMetaData[equipId];	
	var infoPanel = d3.select(".focusedEquipDialog .content");
	infoPanel.html("");
	infoPanel.append("div")
		.classed("focused-infotab-accordion-content", true);
	
	// 高亮focus部件
	d3.selectAll(".optmask.focused")
		.classed("focused", false);
	d3.select("#"+equipId+".optmask")
		.classed("focused", true);
	
	// 载入信息框数据
	$.get(info.infoFile+"?v=1.04", function(infoData){// load the data every time
		$.get(info.model+"?v=1.04", function(modelData){
			var nextTitle = "设备信息 - " + info.name;
			$(".focusedEquipDialog").parent()
				.find(".ui-dialog-title")
				.text(nextTitle);
			var infomodel = infoData + modelData;
			var context = $(".focusedEquipDialog .content .focused-infotab-accordion-content");
			context.html(infomodel);
			context.accordion({
				   collapsible: true,
				   active: false,
				   heightStyle: "content"
				   });
			if (CT_STATE.CURRENT_ID == equipId) {
				$(".focusedEquipDialog").dialog("close");
				return;
			}
			$(".focusedEquipDialog").dialog("open");
		});
	});
}

function initFocusedEquipDialog(){
	$(".focusedEquipDialog").dialog({
		autoOpen : false,
		width : 500,
		maxHeight: 550,
		close: function(){
			d3.selectAll(".optmask.focused")
				.classed("focused", false);
		}
		});
}

/**
 * 放置静态图片
 * @param info 信息体
 */
function putCTMapImg(info){
	d3.select("#three-column .svg-container")
		.html("");
	d3.select("#three-column .svg-container")
		.append("div")
		.classed("root", true)
		.append("img")
		.attr("src", info.imgUrl)
		.classed("ct-map-img", true);
	
    var $panzoom = $('#three-column .svg-container .root').panzoom(
    		);
    $panzoom.parent().on('mousewheel.focal', function( e ) {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.1,
        focal: e
      });
    });
	// TODO: zoom and pan 效果
}

// d3 行为
