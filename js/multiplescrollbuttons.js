// Go to top button code provided by W3schools, altered for transitions
// When the user scrolls down 1000px from the top of the document, show the button
window.onscroll = function() {fpScrollFunction()};

function fpScrollFunction()
{
	var expandedSection = document.getElementsByClassName("collapse show")[0];

	if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000)
	{
		 if (expandedSection !== undefined)
		 {
			 document.getElementById("fpUpButton").style = "opacity: 1; -webkit-transition: opacity 400ms; pointer-events: all";
		 }
		 document.getElementById("upButton").style = "opacity: 1; -webkit-transition: opacity 400ms; pointer-events: all";
	}
	else
	{
		document.getElementById("upButton").style = "opacity: 0; -webkit-transition: opacity 400ms; pointer-events: none";
		document.getElementById("fpUpButton").style = "opacity: 0; -webkit-transition: opacity 400ms; pointer-events: none";
	}
};

// When the user clicks on the button, scroll to the top of the document
function fpTopFunction()
{
	var section = document.getElementsByClassName("collapse show")[0];
	var sectionRect = section.getBoundingClientRect();

	// Subtracting pixels because the naviation bar will cover the header otherwise
	document.documentElement.scrollTop = window.scrollY + sectionRect.y - 125; // For Chrome, Firefox, IE and Opera
	document.body.scrollTop = window.scrollY + sectionRect.y - 125; // For Safari
};

function removeUpButton(button)
{
	document.getElementById(button).style = "opacity: 0; -webkit-transition: opacity 400ms; pointer-events: none";
};
