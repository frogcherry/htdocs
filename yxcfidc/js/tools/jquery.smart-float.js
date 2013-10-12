$.fn.smartFloat = function() {
    var position = function(element) {
    	var ptop = element.parent().position().top;
        var top = element.position().top;
        $(window).scroll(function() {
            var scrolls = $(this).scrollTop();
            if (scrolls > top + ptop) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });    
                } else {
                    element.css({
                        top: scrolls
                    });    
                }
            }else {
                element.css({
                    position: "absolute",
                    top: top
                });    
            }
        });
    };
    return $(this).each(function() {
        position($(this));                         
    });
};