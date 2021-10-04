var charArray = []

function loadCharacters() {
    mmsContents = document.getElementById("mmsContents").value;
    splitContents = mmsContents.split("\n");
    charArray.length = 0; // Clear out character array
    charList = document.getElementById("characters");
    charList.innerHTML = '';

    var checkedValue = document.getElementById('hideNotes').checked;

    for (let line of splitContents) {
        let stripped = line.split("|")[0];
        charArray.push(stripped.toLowerCase());

        if (checkedValue)
            line = stripped

        charList.insertAdjacentHTML('beforeend', '<li class="list-group-item">' + line + '</li>');
    }
}

function generateCommand() {
    commandField = document.getElementById("command");

    commandField.value = "$sm " + charArray.join(" $ ");
}

function clearMMS() {
    document.getElementById("mmsContents").value = '';
    charList.innerHTML = '';
    charArray.length = 0;
}

// Stolen from w3schools
function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("command");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
}