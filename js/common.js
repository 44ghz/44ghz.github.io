var head =
`<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="manifest" href="site.webmanifest">
<link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#603cba">
<meta name="theme-color" content="#ffffff">`;

var body =
`	<p class="display-4" style="color:black; background-color: white; text-align:center; padding: 20px; user-select: none">
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
			<div class="dropdown-menu" style="background: #f9f9f9;">
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

		<button class="nav-link" style="height: 0px;" id="moon"> <i class="far fa-moon"></i></button>

	</ul>
</nav>
<button onclick="topFunction()" id="upButton" class="btn btn-dark"><i class="fas fa-arrow-up"></i></button>
<script src="js/scrolltotop.js"></script>`;

$("head").append(head);
document.write(body);
