function loadCharacters() {
    mmsContents = document.getElementById("mmsContents").value;
    splitContents = mmsContents.split("\n");
    charList = document.getElementById("characters");
    charList.innerHTML = '';

    var checkedValue = document.getElementById('hideNotes').checked;

    for (let line of splitContents) {
        let stripped = line.split("|")[0];

        if (checkedValue)
            line = stripped

        charList.insertAdjacentHTML('beforeend', '<li class="list-group-item">' + line + '</li>');
    }
}

function generateCommand() {
    charArray = [];
    charactersHTML = document.getElementById("characters").innerHTML;
    splitList = charactersHTML.split("</li>");

    if (splitList[splitList.length - 1] == "")
        splitList.pop();

    for (let line of splitList) {
        charArray.push(line.split('\">')[1].split(" | ")[0].toLowerCase()); // Can probably change this to a regex
    }

    commandField = document.getElementById("command");

    commandField.value = "$sm " + charArray.join("$");
}

function clearMMS() {
    document.getElementById("mmsContents").value = '';
    document.getElementById("characters").innerHTML = '';
    document.getElementById("command").value = '';
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

    copyConfirmIcon = document.getElementsByClassName("copyConfirm")[0];
    copyConfirmIcon.style.opacity = 100;
    setTimeout(() => { copyConfirmIcon.style.opacity = 0 }, 3000);
}