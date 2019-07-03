var head =
`<link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
<link rel="manifest" href="icons/site.webmanifest">
<link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="icons/favicon.ico">
<meta name="msapplication-TileColor" content="#603cba">
<meta name="msapplication-config" content="icons/browserconfig.xml">
<meta name="theme-color" content="#ffffff">`;

var body =
`	<p class="display-4">
		Placeholder Text
		<small style="font-size: 14px">test</small>
	</p>


<nav class="navbar navbar-expand-sm navbar-dark justify-content-center sticky-top shadow-sm">
	<ul class="navbar-nav">

		<li class="nav-item">
			<a class="nav-link" href="index.html"><i class="fas fa-home"></i>&nbspHome</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="docs/George Perez Resume.pdf"><i class="far fa-address-card"></i>&nbspResume</a>
		</li>

		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="" id="navbardrop" data-toggle="dropdown">
				<i class="fas fa-laptop-code"></i>
				Projects
			</a>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="projects.html">Project Home</a>

				<a class="dropdown-item" href="schoolwork.html">Schoolwork</a>
				<a class="dropdown-item" href="greenscreen.html">Greenscreen</a>
			</div>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="https://github.com/44ghz"><i class="fab fa-github"></i>&nbspGitHub</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="https://linkedin.com/in/george-perez-749b95174"><i class="fab fa-linkedin"></i>&nbspLinkedIn </a>
		</li>

		<li class="nav-item">
			<a class="nav-link" href="mailto:george9722@gmail.com"><i class="far fa-paper-plane"></i>&nbspContact</a>
		</li>

		<div style="border-left:1px solid #f9f9f9; height:40px"></div>

		<script src="js/nightmode.js"></script>
		<button onclick="toggleNightMode()" id="moon"><i id="moonIcon"></i></button>

	</ul>
</nav>
<button onclick="topFunction()" id="upButton" class="btn btn-dark"><i style="padding-top: 0.4rem;" class="fas fa-angle-up"></i></button>
<script src="js/scrolltotop.js"></script>`;

var page = document.getElementsByTagName("html")[0]; // Get the entire html page as an object

if(localStorage["mode"] === "dark") // Ensure the site retains the color mode
{
	// Allows the correct icon to carry through
	$(document).ready(function() {$("#moonIcon").addClass("fas fa-moon"); return false});

	page.style.cssText = "--mydark: #ced0d9";
	page.style.cssText += "--mylight: #282c34";
	page.style.cssText += "--mygray: #1f2329";
	page.style.cssText += "--mylight-gray: #343b45"
	page.style.cssText += "--mydark-gray: #21242b";
	page.style.cssText += "--white: #000000";
	page.style.cssText += "--black: #ffffff";
	head += "<link rel='stylesheet' href='./highlight/styles/atom-one-dark.css'>";

}
else
{
	// Allows the correct icon to carry through
	$(document).ready(function() {$("#moonIcon").addClass("far fa-moon"); return false});

	page.style.cssText = "--mydark: #414345";
	page.style.cssText += "--mylight: #f9f9f9";
	page.style.cssText += "--mygray: #e8e8e8";
	page.style.cssText += "--mylight-gray: #f2f2f2";
	page.style.cssText += "--mydark-gray: #e0e0e0";
	page.style.cssText += "--white: #ffffff";
	page.style.cssText += "--black: #000000";
	head += "<link rel='stylesheet' href='./highlight/styles/atom-one-light.css'>";
}

document.write(body);

$("head").append(head);
