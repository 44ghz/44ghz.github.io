// Add line number toggle functionality
var script = document.createElement("script");
script.src = "js/lineswitch.js";

document.head.appendChild(script);

document.addEventListener("DOMContentLoaded", function(e)
{
	// Getting each code source
	send_request("main.pyw", "main");
	send_request("/modules/dataretrieval.py", "dataretrieval");
	send_request("/modules/options.py", "options");
	send_request("/modules/results.py", "results");
	send_request("/modules/tkfunctions.py", "tkfunctions");
});

function send_request(filePath, fnName)
{
	var request = new XMLHttpRequest();
	request.onload = function()
	{
		var responseObj = JSON.parse(this.responseText);
		var content = responseObj.content;
		content = atob(content); // Decoding the content of the file
		content = pad_content(content); // Add spaces to beginning of each line to offset the line numbering
		get_content(fnName, content);
	};

	request.open('get', 'https://api.github.com/repos/44ghz/flight-picker/contents/' + filePath, true)
	request.send();
};

function get_content(fnName, content)
{
	// Converting fnName to TitleCase, credit to a8m on StackOverflow!
	fnName = fnName.split(' ').map(w => w[0].toUpperCase() +
		w.substr(1).toLowerCase()).join(' ');

	// Creating element for code display
	$(document.getElementById("fp" + fnName + "Body")).append(
	` <pre><code class="hljs python">` + content + `</code></pre>`);

	// Remove the loading circle when the content is loaded
	var removeLoading = document.getElementById("loadingFp" + fnName);
	removeLoading.parentNode.removeChild(removeLoading);

	document.querySelectorAll('pre code').forEach((block) => {
			hljs.highlightBlock(block);
		});

	$(document).ready(function() {
		$('code.hljs').each(function(i, block) {
			hljs.lineNumbersBlock(block);
		});
	});
};

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
