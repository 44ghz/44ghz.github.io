function printRepoCount()
{
  var responseObj = JSON.parse(this.responseText);
	//var text = "<div class='container'><p>" + (responseObj.name + " has " + responseObj.public_repos + " public repositories!") + "</p></div>";
	var text = responseObj.content;
	text = atob(text);
  console.log(text);
	return text;
}
var request = new XMLHttpRequest();
var test = printRepoCount;
request.onload = test;
request.open('get', 'https://api.github.com/repos/44ghz/greenscreen/contents/greenscreen.java', true)
request.send()

var container = document.createElement('div');
container.innerHTML = "ee";
