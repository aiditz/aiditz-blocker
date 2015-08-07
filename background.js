
var blockList = [
	{
		page : 'vk\\.com\\/feed$',
		class: 'post',
		attr : 'data-ad-view'
	}, 
	{
		page : 'vk\\.com\\/feed$',
		class: 'ads_ads_news_wrap'
	}, 
	{
		page: 'vk\\.com\\/feed',
		id  : 'feed_recommends'
	},
	{
		page: 'vk\\.com\\/feed',
		attr: 'data-ad-view'
	},
	{
		page : 'youtube.com\\/watch\\?v=',
		class: 'video-ads'
	},
	{
		page : 'livejournal\\.com',
		id   : 'ljlive'
	}
];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
	if (changeInfo.status != 'complete') return;
		
	var code = '';
  
	for (var k in blockList) {
		var item = blockList[k];
		if (new RegExp(item.page).test(tab.url.toLowerCase())) {
			
			if (item.id) {
				code += "var el = document.getElementById('" + item.id + "');" + 
				        "if (el) el.parentNode.removeChild(el);";
			}
			else if (item.class) {
				code += "var els = document.getElementsByClassName('" + item.class + "');" + 
				        "for(var k = 0; k < els.length; k++) {" +	
				        "  var el = els[k];";
			
				if (item.attr) {
					code += "  if (el.getAttribute('" + item.attr + "'))";
				}
				
				code += "  el.parentNode.removeChild(el);" +
				        "}";
			}
			else if (item.tag) {
				code += "var els = document.getElementsByTagName('" + item.tag.toUpperCase() + "');" + 
				        "for(var k = 0; k < els.length; k++) {" +	
				        "  var el = els[k];";
			
				if (item.attr) {
					code += "  if (el.getAttribute('" + item.attr + "'))";
				}
				
				code += "  el.parentNode.removeChild(el);" +
				        "}";
			}
		};
	}
  
	if (code == '') {
		return;
	}
	
	setTimeout(function() {
		chrome.tabs.executeScript(tab.id, {code: code});
	}, 0);
});
