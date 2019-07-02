function get_content()
{
  var responseObj = JSON.parse(this.responseText);
	var content = responseObj.content;
	content = atob(content); // Decoding the content of the file
	content = pad_content(content); // Add spaces to beginning of each line to offset the line numbering

	// Creating element for code display
	$(document.body).append(
	` <div class="wrapper"><pre><code class="hljs c++">` + content + `</code></pre></div>
		<div class="wrapper" style="pointer-events: none; user-select: none; user-interaction: none; disabled">
		<div style="text-align: center; padding-bottom: 40px;">
			<img draggable="false" src="img/ghmark32.png" alt="GitHub Mark" style="opacity: 0.2;"></img><span style="font-size: 12px; opacity: 0.4;">&nbspAPI</span>
		</div>
		</div>`);

	// Remove the loading circle when the content is loaded
	var removeLoading = document.getElementById("loadingnm");
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
};

function send_request()
{
	var request = new XMLHttpRequest();
	var fn = get_content;
	request.onload = fn;
	request.open('get', 'https://api.github.com/repos/44ghz/roman-numeral-converter/contents/numerals.cpp', true)
	request.send();
};

document.addEventListener("DOMContentLoaded", function(e)
{
	send_request();
});

function pad_content(content)
{
	content = content.split('<').join("&lt"); // Replacing angle brackets to display on page
	content = content.split('>').join("&gt"); // Replacing angle brackets to display on page
	var newContent = content.split('\n'); // Split the string on all newlines


	for(var i = 0; i < newContent.length; i++) // Add a space to the beginning of each line
	{
		newContent[i] = " " + newContent[i];
	}

	newContent = newContent.join("\n"); // Add the newlines back
	return newContent;
};
