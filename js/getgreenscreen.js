function get_content()
{
  var responseObj = JSON.parse(this.responseText);
	var content = responseObj.content;
	content = atob(content); // Decoding the content of the file

	hljs.initHighlightingOnLoad();
	// Creating element for code display
	$(document.body).append("<div class='wrapper'><pre class='pre-scrollable'><code class='hljs java'>" + content + "</code></pre></div>");
	hljs.initLineNumbersOnLoad();

	//hljs.configure({ useBR: true });
	// document.addEventListener('DOMContentLoaded', (event) => {
	// 	document.querySelectorAll('pre code').forEach((block) => {
	// 		hljs.highlightBlock(block);
	// 	});
	// });
}

function send_request()
{
	var request = new XMLHttpRequest();
	var fn = get_content;
	request.onload = fn;
	request.open('get', 'https://api.github.com/repos/44ghz/greenscreen/contents/greenscreen.java', true)
	request.send();
}

document.addEventListener("DOMContentLoaded", function(e)
{
	send_request();
});
