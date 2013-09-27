// states
var ACCEPT_ZOOM = true;

// meta data
var CtMapMetaData = {};

// ready
$(document).ready(function(){
	loadMetaData(function(){
		navTo(1);
	});
});

/**
 * 载入元数据
 */
function loadMetaData(callback){
	// load ct map meta data
	d3.csv("data/csvs/ct.csv",
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
	ACCEPT_ZOOM = false;
	
	$("#three-column .svg-container")
		.html("<span style='font-size:65px;'>建设中。。。<span>");
	$("#page").hide();
	$("#portfolio").hide();
}

//显示错误空页面
function showError(){
	ACCEPT_ZOOM = false;
	
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
	ACCEPT_ZOOM = true;
	
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
	var content = $("#page #box1 .content");
	content.load(info.infoFile, function(){
		content.accordion({
			collapsible: true,
			active: false,
			heightStyle: "content"
			});
	});
	// load file list part
	var fileListCon = $("#page #box2 .content");
	fileListCon.load(info.fileList);
	
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
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			zoom: {
				    enabled: true, // By default it's false, so don't forget to enable it

				    duration: 300, // duration of the effect, in milliseconds
				    easing: 'ease-in-out', // CSS transition easing function 

				    // The "opener" function should return the element from which popup will be zoomed in
				    // and to which popup will be scaled down
				    // By defailt it looks for an image tag:
				    opener: function(openerElement) {
				      // openerElement is the element on which popup was initialized, in this case its <a> tag
				      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
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

function openImgDialog(imgPath, idx){
	$("#portfolio .imgList li").removeClass("current_item");
	$("#portfolio .imgList .li_"+idx).addClass("current_item");
}

var svgZoomLock = false;
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
//				if (svgZoomLock) {
//					return;
//				}
//				svgZoomLock = true;
				effectLayer.attr("transform", "translate(" + d3.event.translate + ") "
						+ "scale(" + d3.event.scale + ")");
//				setTimeout(function(){svgZoomLock = false;}, 200);
			}); // return zoom object
		rootG.call(zoom);
		// TODO: bind children UI behavior
	});
}

/**
 * 放置静态图片
 * @param info 信息体
 */
function putCTMapImg(info){
	// TODO:
}

// d3 行为
