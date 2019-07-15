function toggleNightMode()
{
	var date = new Date(); // Getting current date and time for use in deciding which day mode to display
	var currentHour = date.getHours();
	var cloudImageNumber = Math.floor(Math.random() * 3); // Random cloud image selection

	var page = document.getElementsByTagName("html")[0]; // Get the entire html page as an object

	if(localStorage["mode"] === "dark") // If the site is in dark mode, make it light
	{
		page.style.cssText = "--mydark: #414345";
		page.style.cssText += "--mylight: #f9f9f9";
		page.style.cssText += "--mygray: #e8e8e8";
		page.style.cssText += "--mylight-gray: #f2f2f2";
		page.style.cssText += "--mydark-gray: #e0e0e0";

		if(currentHour <= MORNING && currentHour > SUNRISE) // Orange-yellow theme
		{
			page.style.cssText += "--nav-hover: rgba(255, 234, 199, 0.5)";
			page.style.cssText += "--nav-gradient-1: #fcd8bb";
			page.style.cssText += "--nav-gradient-2: #ff9b54";
		}
		else if(currentHour <= AFTERNOON && currentHour > MORNING) // Light blue theme
		{
			page.style.cssText += "--nav-hover: rgba(89, 200, 255, 0.5)";
			page.style.cssText += "--nav-gradient-1: #adcdff";
			page.style.cssText += "--nav-gradient-2: #5e9dff";
		}
		else if(currentHour <= EVENING && currentHour > AFTERNOON) // Darker orange, reversed
		{
			page.style.cssText += "--nav-hover: rgb(179, 86, 16, 0.5)";
			page.style.cssText += "--nav-gradient-1: #ff8b38";
			page.style.cssText += "--nav-gradient-2: #ffbd87";
		}
		else // Darker orange / lavender
		{
			page.style.cssText += "--nav-hover: rgba(140, 61, 0, 0.5)";
			page.style.cssText += "--nav-gradient-1: #de6910";
			page.style.cssText += "--nav-gradient-2: #85759c";
		}

		page.style.cssText += "--nav-background-img: url(../img/clouds" + cloudImageNumber + ".png)";

		page.style.cssText += "--display-light: #ffffff";
		page.style.cssText += "--white: #ffffff";
		page.style.cssText += "--black: #000000";

		// Replacing the stylesheets for code display
		$("link[rel=stylesheet][href~='./highlight/styles/atom-one-dark.css']").remove();
		$("head").append("<link rel='stylesheet' href='highlight/styles/atom-one-light.css'>");

		localStorage["mode"] = "light"; // Updating local storage

		// Animation for changing icon once the moon has set
		window.setTimeout(function(){
			$("#moonIcon").removeClass("fas fa-moon"); // Swapping moon icon
			$("#moonIcon").addClass("fas fa-sun");
		}, 200);
	}
	else
	{
		page.style.cssText = "--mydark: #ced0d9";
		page.style.cssText += "--mylight: #282c34";
		page.style.cssText += "--mygray: #1f2329";
		page.style.cssText += "--mylight-gray: #343b45"
		page.style.cssText += "--mydark-gray: #21242b";
		page.style.cssText += "--nav-hover: rgba(59, 54, 69, 0.5)";
		page.style.cssText += "--nav-gradient-1: #33303d";
		page.style.cssText += "--nav-gradient-2: #1c1e24";
		page.style.cssText += "--display-light: #1a191f"
		page.style.cssText += "--white: #000000";
		page.style.cssText += "--black: #ffffff";
		page.style.cssText += "--nav-background-img: url(../img/stars.png)";

		// Replacing the stylesheets for code display
		$("link[rel=stylesheet][href~='./highlight/styles/atom-one-light.css']").remove();
		$("head").append("<link rel='stylesheet' href='highlight/styles/atom-one-dark.css'>");

		localStorage["mode"] = "dark"; // Updating local storage

		// Animation for changing icon once the moon has set
		window.setTimeout(function(){
			$("#moonIcon").removeClass("fas fa-sun"); // Swapping moon icon
			$("#moonIcon").addClass("fas fa-moon");
		}, 200);

	}
};
		$(document).ready(function(){$("#moon")
			.click(function(){
				$("#moonIcon").slideUp("fast"); $("#moonIcon").slideDown("fast")})});
