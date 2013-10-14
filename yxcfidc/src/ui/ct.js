// ready
$(document).ready(function(){
	loadMetaData(function(){
		navTo(1);
		$(".tipPanel.navPath").smartFloat();
	});
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
/**
 * 显示层次部件
 * @param id: 设备位置编号
 */
function showCTMap(id){
	$("#page").show();
	$("#portfolio").show();

	var info = CtMapMetaData[id];
	// load img/svg part
	if (info.imgType == "svg") {
		putCTMapSvg(info);
	} else if (info.imgType == "img"){
		putCTMapImg(info);
	}
	
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
				var nextId = d3.select(this)
					.attr("id");
				console.log("dblclick# "+nextId);
				showCTMap(nextId);
			});
		
		// bind click to show focused equip's info
		rootG.selectAll(".optmask")
			.on("click", function(){
				var nextId = d3.select(this)
					.attr("id");
				console.log("click# "+nextId);
				showFocusedInfo(nextId);
			});
		
		// TODO: bind children UI behavior
	});
}

function showFocusedInfo(equipId){
	d3.select(".focusedEquipDialog").remove();
	d3.select("body")
		.append("div")
		.classed("focusedEquipDialog", true)
		.html(d3.select("#box1").html());
	$(".focusedEquipDialog").dialog({autoOpen : false});
	$(".focusedEquipDialog").dialog("open");
}

/**
 * 放置静态图片
 * @param info 信息体
 */
function putCTMapImg(info){
	// TODO:
}

function updateNavPath(){
	
}

// d3 行为
