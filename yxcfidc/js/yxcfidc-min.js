function loadMetaData(a){d3.csv("data/meta/ct.csv",function(a){return a},function(b,c){if(b){showError(),alert("系统错误!!"+b);return}CtMapMetaData={};for(var d=0;d<c.length;d++){var e=c[d];CtMapMetaData[e.locId]=e}for(var d=0;d<c.length;d++){var e=c[d];e.parent in CtMapMetaData&&(Array.isArray(CtMapMetaData[e.parent].children)||(CtMapMetaData[e.parent].children=[]),CtMapMetaData[e.parent].children.push(e.locId))}a&&a()})}function navTo(a){$("#menu li").removeClass("current_page_item"),$("#menu .li"+a).addClass("current_page_item");switch(a){case 1:showCTMap("ct");break;default:showBuidingInfo()}}function showBuidingInfo(){$("#three-column .svg-container").html("<span style='font-size:65px;'>建设中。。。<span>"),$("#page").hide(),$("#portfolio").hide()}function showError(){$("#three-column .svg-container").html("<span style='font-size:65px;'>系统错误。。。<span>"),$("#page").hide(),$("#portfolio").hide()}function showCTMap(a){$("#page").show(),$("#portfolio").show();var b=CtMapMetaData[a];b.imgType=="svg"?putCTMapSvg(b):b.imgType=="img"&&putCTMapImg(b);var c=d3.select("#page #box1 .content");c.html(""),c.append("div").classed("infotab-accordion-content",!0),$.get(b.infoFile+"?v=1.03",function(a){$.get(b.model+"?v=1.03",function(b){var c=a+b,d=$("#page #box1 .content .infotab-accordion-content");d.html(c),d.accordion({collapsible:!0,active:!1,heightStyle:"content"})})});var d=d3.select(".tipPanel.navPath");d.html("");var e=b.path.split(";");for(var f=0;f<e.length;f++){var g=e[f],h=CtMapMetaData[g].name;f<e.length-1?(d.append("a").text(h).attr("href","#").attr("onclick","showCTMap('"+g+"')"),d.append("span").text("  /  ")):d.append("span").text(h)}var i=$("#page #box2 .content");i.load(b.fileList+"?v=1.03");var j=$("#portfolio .imgList");j.html("");var k=b.imgs.split(";");for(var f=0;f<k.length;f++){var l=k[f].split("/").pop(),m='<li class="li_'+f+'"><a'+' title="'+l+'"'+' class="image image-full cursor_hand" href="'+k[f]+'"><img src="'+k[f]+'" alt="" /></a></li>';j.append(m)}setTimeout(function(){j.magnificPopup({delegate:"a",type:"image",tLoading:"Loading image #%curr%...",mainClass:"mfp-with-zoom mfp-img-mobile",gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(a){return a.is("img")?a:a.find("img")}},image:{tError:'<a href="%url%">The image #%curr%</a> could not be loaded.',titleSrc:function(a){return"<small>"+b.name+"</small>"+a.el.attr("title")}}})},200)}function putCTMapSvg(a){$("#three-column .svg-container").load(a.imgUrl,function(){var a=d3.select("#three-column .svg-container .root"),b=a.select(".effectLayer"),c=d3.behavior.zoom().scaleExtent([.5,8]).on("zoom",function(){b.attr("transform","translate("+d3.event.translate+") "+"scale("+d3.event.scale+")")});a.call(c),a.selectAll(".optmask").on("dblclick",function(){var a=d3.select(this).attr("id");console.log("dblclick# "+a),showCTMap(a)}),a.selectAll(".optmask").on("click",function(){var a=d3.select(this).attr("id");console.log("click# "+a),showFocusedInfo(a)})})}function showFocusedInfo(a){d3.select(".focusedEquipDialog").remove(),d3.select("body").append("div").classed("focusedEquipDialog",!0).html(d3.select("#box1").html()),$(".focusedEquipDialog").dialog({autoOpen:!1}),$(".focusedEquipDialog").dialog("open")}function putCTMapImg(a){}function updateNavPath(){}$.fn.smartFloat=function(){var a=function(a){var b=a.parent().position().top,c=a.position().top;$(window).scroll(function(){var d=$(this).scrollTop();d>c+b?window.XMLHttpRequest?a.css({position:"fixed",top:0}):a.css({top:d}):a.css({position:"absolute",top:c})})};return $(this).each(function(){a($(this))})};var CtMapMetaData={};$(document).ready(function(){loadMetaData(function(){navTo(1),$(".tipPanel.navPath").smartFloat()})});