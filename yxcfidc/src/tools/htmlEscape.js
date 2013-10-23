/**
 * 根据需要，替换大于小于号
 */

util.htmlEscape = function(text) {
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