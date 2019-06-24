// Go to top button code provided by W3schools, altered for transitions
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
		document.getElementById("upButton").style = "opacity: 1; -webkit-transition: opacity 400ms; pointer-events: all";
	} else {
		document.getElementById("upButton").style = "opacity: 0; -webkit-transition: opacity 400ms; pointer-events: none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	document.body.scrollTop = 0; // For Safari
}
