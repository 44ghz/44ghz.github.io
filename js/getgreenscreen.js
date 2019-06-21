function get_content()
{
  var responseObj = JSON.parse(this.responseText);
	var content = responseObj.content;
	content = atob(content); // Decoding the content of the file

	//hljs.initLineNumbersOnLoad();
	//hljs.initHighlightingOnLoad();

	//document.getElementById("testing"). = content;
	$(document.body).append("<script>hljs.initHighlightingOnLoad(); hljs.initLineNumbersOnLoad();</script>")
	$(document.body).append("<div class='wrapper'><pre class='pre-scrollable'><code class='hljs java'>" + content + "</code></pre></div>");
	document.addEventListener('DOMContentLoaded', (event) => {
		document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});
	});
	$(document).ready(function() {
		$('code.hljs').each(function(i, block) {
			hljs.lineNumbersBlock(block);
		});
	});
	//
	//
}

var request = new XMLHttpRequest();
var fn = get_content;
request.onload = fn;
request.open('get', 'https://api.github.com/repos/44ghz/greenscreen/contents/greenscreen.java', true)
request.send();
