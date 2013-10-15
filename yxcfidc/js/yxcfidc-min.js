function loadMetaData(a){d3.csv("data/meta/ct.csv",function(a){return a},function(b,c){if(b){showError(),alert("系统错误!!"+b);return}CtMapMetaData={};for(var d=0;d<c.length;d++){var e=c[d];CtMapMetaData[e.locId]=e}for(var d=0;d<c.length;d++){var e=c[d];e.parent in CtMapMetaData&&(Array.isArray(CtMapMetaData[e.parent].children)||(CtMapMetaData[e.parent].children=[]),CtMapMetaData[e.parent].children.push(e.locId))}a&&a()})}function navTo(a){$("#menu li").removeClass("current_page_item"),$("#menu .li"+a).addClass("current_page_item");switch(a){case 1:showCTMap("ct");break;default:showBuidingInfo()}}function showBuidingInfo(){$("#three-column .svg-container").html("<span style='font-size:65px;'>建设中。。。<span>"),$("#page").hide(),$("#portfolio").hide()}function showError(){$("#three-column .svg-container").html("<span style='font-size:65px;'>系统错误。。。<span>"),$("#page").hide(),$("#portfolio").hide()}function showCTMap(a,b){$("#page").show(),$("#portfolio").show(),CT_STATE.CURRENT_ID=a;var c=CtMapMetaData[a];c.imgType=="svg"?putCTMapSvg(c):c.imgType=="img"&&putCTMapImg(c);var d=0,e=d3.select("#page #box1 .content");e.html(""),e.append("div").classed("infotab-accordion-content",!0),$.get(c.infoFile+"?v=1.03",function(a){$.get(c.model+"?v=1.03",function(c){var e=a+c,f=$("#page #box1 .content .infotab-accordion-content");f.html(e),f.accordion({collapsible:!0,active:!1,heightStyle:"content"}),d>1?b&&b():d++})});var f=d3.select(".tipPanel.navPath");f.html("");var g=c.path.split(";");for(var h=0;h<g.length;h++){var i=g[h],j=CtMapMetaData[i].name;h<g.length-1?(f.append("a").text(j).attr("href","#").attr("onclick","showCTMap('"+i+"')"),f.append("span").text("  /  ")):f.append("span").text(j)}var k=$("#page #box2 .content");k.load(c.fileList+"?v=1.03");var l=$("#portfolio .imgList");l.html("");var m=c.imgs.split(";");for(var h=0;h<m.length;h++){var n=m[h].split("/").pop(),o='<li class="li_'+h+'"><a'+' title="'+n+'"'+' class="image image-full cursor_hand" href="'+m[h]+'"><img src="'+m[h]+'" alt="" /></a></li>';l.append(o)}setTimeout(function(){l.magnificPopup({delegate:"a",type:"image",tLoading:"Loading image #%curr%...",mainClass:"mfp-with-zoom mfp-img-mobile",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(a){return a.is("img")?a:a.find("img")}},image:{tError:'<a href="%url%">The image #%curr%</a> could not be loaded.',titleSrc:function(a){return"<small>"+c.name+"</small>"+a.el.attr("title")}}}),d>1?b&&b():d++},200)}function putCTMapSvg(a){$("#three-column .svg-container").load(a.imgUrl,function(){var a=d3.select("#three-column .svg-container .root"),b=a.select(".effectLayer"),c=d3.behavior.zoom().scaleExtent([.5,8]).on("zoom",function(){b.attr("transform","translate("+d3.event.translate+") "+"scale("+d3.event.scale+")")});a.call(c),a.selectAll(".optmask").on("dblclick",function(){var a=d3.select(this).attr("id");console.log("dblclick# "+a),showCTMap(a)}),a.selectAll(".optmask").on("click",function(){var a=d3.select(this).attr("id");console.log("click# "+a),showFocusedInfo(a)}),$(".focusedEquipDialog").dialog("close")})}function showFocusedInfo(a){if(CT_STATE.CURRENT_ID==a){$(".focusedEquipDialog").dialog("close");return}var b=CtMapMetaData[a],c=d3.select(".focusedEquipDialog .content");c.html(""),c.append("div").classed("focused-infotab-accordion-content",!0),d3.selectAll(".optmask.focused").classed("focused",!1),d3.select("#"+a+".optmask").classed("focused",!0),$.get(b.infoFile+"?v=1.04",function(c){$.get(b.model+"?v=1.04",function(d){var e="设备信息 - "+b.name;$(".focusedEquipDialog").parent().find(".ui-dialog-title").text(e);var f=c+d,g=$(".focusedEquipDialog .content .focused-infotab-accordion-content");g.html(f),g.accordion({collapsible:!0,active:!1,heightStyle:"content"});if(CT_STATE.CURRENT_ID==a){$(".focusedEquipDialog").dialog("close");return}$(".focusedEquipDialog").dialog("open")})})}function initFocusedEquipDialog(){$(".focusedEquipDialog").dialog({autoOpen:!1,width:500,maxHeight:550,close:function(){d3.selectAll(".optmask.focused").classed("focused",!1)}})}function putCTMapImg(a){d3.select("#three-column .svg-container").html(""),d3.select("#three-column .svg-container").append("div").classed("root",!0).append("img").attr("src",a.imgUrl).classed("ct-map-img",!0);var b=$("#three-column .svg-container .root").panzoom();b.parent().on("mousewheel.focal",function(a){a.preventDefault();var c=a.delta||a.originalEvent.wheelDelta,d=c?c<0:a.originalEvent.deltaY>0;b.panzoom("zoom",d,{increment:.1,focal:a})})}$.fn.smartFloat=function(){var a=function(a){var b=a.parent().position().top,c=a.position().top;$(window).scroll(function(){var d=$(this).scrollTop();d>c+b?window.XMLHttpRequest?a.css({position:"fixed",top:0}):a.css({top:d}):a.css({position:"absolute",top:c})})};return $(this).each(function(){a($(this))})};var CtMapMetaData={};$(document).ready(function(){loadMetaData(function(){navTo(1),$(".tipPanel.navPath").smartFloat()}),initFocusedEquipDialog()});var CT_STATE={CURRENT_ID:""};