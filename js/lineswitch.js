var mySwitch = document.getElementById("numberSwitch"); // Add the toggle switch
if(mySwitch.addEventListener) // For major browsers
{
	mySwitch.addEventListener("click", toggleNumbers);
}
else if(mySwitch.attachEvent) // IE 8 and below
{
	mySwitch.attachEvent("onclick", toggleNumbers);
}

function toggleNumbers() // Toggle line numbers for code block
{
	var numbers = document.getElementsByClassName("hljs-ln-n"); // Get the elements for line numbers

	// If the numbers haven't been created yet
	// Numbers are not on by default because of a bug between the highlighting and the numbers
	if(numbers[0] == undefined)
	{
		$('code.hljs').each(function(i, block) {
			hljs.lineNumbersBlock(block);
		});

		return;
	}

	if(numbers[0].style.display === "none") // If the line numbers are visible
	{
		for(var i = 0; i < numbers.length; i++) // Disable all numbers
		{
			numbers[i].style.display = "block";
		}
	}
	else // Otherwise, display them
	{
		for(var i = 0; i < numbers.length; i++)
		{
			numbers[i].style.display = "none";
		}
	}
}
