function get_file() // Get the file URL and open
{
	var responseObj = JSON.parse(this.responseText);
	var responseURL = responseObj.download_url;
	window.open(responseURL, '_blank'); // Open file in new tab
};

function download_source(repo, filePath)
{
	var request = new XMLHttpRequest();
	var fn = get_file;
	request.onload = fn;
	request.open('get', 'https://api.github.com/repos/44ghz/' + repo + '/contents/' + filePath, true)
	request.send();
};
