function get_content()
{
  var responseObj = JSON.parse(this.responseText);
	var content = responseObj.content;
	content = atob(content); // Decoding the content of the file

	//hljs.initHighlightingOnLoad();
	// Creating element for code display
	$(document.body).append('<div class="wrapper" style="padding-left: 300px; padding-right: 300px">' +
	'<div class="custom-control custom-switch" style="padding-left: 43px">' +
	'	<input type="checkbox" class="custom-control-input" id="numberSwitch" checked>' +
	'	<label class="custom-control-label" for="numberSwitch" style="user-select: none">Toggle line numbers</label>' +
	'</div><pre><code class="hljs java">' + content + '</code></pre></div>');

	//hljs.configure({ useBR: true });
	//hljs.initLineNumbersOnLoad();
	document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});

	$(document).ready(function() {
		$('code.hljs').each(function(i, block) {
			hljs.lineNumbersBlock(block);
		});
	});

	var script = document.createElement("script");
	script.src = "js/lineswitch.js";

	document.head.appendChild(script);
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
