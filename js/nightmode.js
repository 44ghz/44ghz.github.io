function toggleNightMode()
{
	var page = document.getElementsByTagName("html")[0]; // Get the entire html page as an object

	if(localStorage["mode"] === "light") // If the site is in light mode, make it dark
	{
		page.style.cssText = "--mydark: #ced0d9";
		page.style.cssText += "--mylight: #282c34";
		page.style.cssText += "--mygray: #1f2329";
		page.style.cssText += "--mylight-gray: #343b45"
		page.style.cssText += "--mydark-gray: #21242b";
		page.style.cssText += "--nav-hover: #3b3645";
		page.style.cssText += "--nav-gradient-1: #33303d";
		page.style.cssText += "--nav-gradient-2: #1c1e24";
		page.style.cssText += "--display-light: #1a191f"
		page.style.cssText += "--white: #000000";
		page.style.cssText += "--black: #ffffff";

		// Replacing the stylesheets for code display
		$("link[rel=stylesheet][href~='./highlight/styles/atom-one-light.css']").remove();
		$("head").append("<link rel='stylesheet' href='highlight/styles/atom-one-dark.css'>");

		localStorage["mode"] = "dark"; // Updating local storage

		// Animation for changing icon once the moon has set
		window.setTimeout(function(){
			$("#moonIcon").removeClass("far fa-moon"); // Swapping moon icon
			$("#moonIcon").addClass("fas fa-moon");
		}, 200);
	}
	else
	{
		page.style.cssText = "--mydark: #414345";
		page.style.cssText += "--mylight: #f9f9f9";
		page.style.cssText += "--mygray: #e8e8e8";
		page.style.cssText += "--mylight-gray: #f2f2f2";
		page.style.cssText += "--mydark-gray: #e0e0e0";
		page.style.cssText += "--nav-hover: #fff1c7";
		page.style.cssText += "--nav-gradient-1: #fceabb";
		page.style.cssText += "--nav-gradient-2: #ffd754";
		page.style.cssText += "--display-light: #ffffff"
		page.style.cssText += "--white: #ffffff";
		page.style.cssText += "--black: #000000";

		// Replacing the stylesheets for code display
		$("link[rel=stylesheet][href~='./highlight/styles/atom-one-dark.css']").remove();
		$("head").append("<link rel='stylesheet' href='highlight/styles/atom-one-light.css'>");

		localStorage["mode"] = "light"; // Updating local storage

		// Animation for changing icon once the moon has set
		window.setTimeout(function(){
			$("#moonIcon").removeClass("fas fa-moon"); // Swapping moon icon
			$("#moonIcon").addClass("far fa-moon");
		}, 200);
	}
};
		// $("#moon").click(function(){$("#moonIcon").slideDown(); $("#moonIcon").slideUp()});
		$(document).ready(function(){$("#moon")
			.click(function(){
				$("#moonIcon").slideUp("fast"); $("#moonIcon").slideDown("fast")})});
