function get_content()
{
  var responseObj = JSON.parse(this.responseText);
	var content = responseObj.content;
	content = atob(content); // Decoding the content of the file

	// Creating element for code display
	$(document.body).append(
	` <div class="wrapper"><pre><code class="hljs java">` + content + `</code></pre></div>
		<div class="wrapper" style="pointer-events: none; user-select: none; user-interaction: none; disabled">
		<div style="text-align: center; padding-bottom: 40px;">
			<img draggable="false" src="img/ghmark32.png" alt="GitHub Mark" style="opacity: 0.2;"></img>
		</div>
		</div>`);

	// Remove the loading circle when the content is loaded
	var removeLoading = document.getElementById("loadinggs");
	removeLoading.parentNode.removeChild(removeLoading);

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
