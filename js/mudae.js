function loadCharacters() {
    charsPerList = 13;
    mmsContents = document.getElementById("mmsContents").value;
    splitContents = mmsContents.split("\n");
    charLists = document.getElementById("characters");
    charLists.innerHTML = '';

    var checkedValue = document.getElementById('hideNotes').checked;

    // Generate lists
    // Split into manageable groups
    numberOfLists = Math.floor(splitContents.length / charsPerList);
    remainder = splitContents.length % charsPerList;
    rowNum = 0;

    if (remainder > 0)
        numberOfLists += 1;

    for (let i = 0; i < numberOfLists; i++) {
        if (i % 2 == 0) {
            rowNum++;
            charLists.insertAdjacentHTML('beforeend', '<div id="character-row-' + rowNum + '" style="display: flex"></div><br><br>');
        }

        row = document.getElementById("character-row-" + rowNum);
        row.insertAdjacentHTML('beforeend', `<div id="character-list-` + i + `" style="width: 45%; padding-right: 5%" class="list-group col char-list-class"></div><br><br>`);

        let element = document.getElementById('character-list-' + i);

        new Sortable(element, {
            group: "chars-group",
            multiDrag: true, // Enable multi-drag
            selectedClass: 'selected', // The class applied to the selected items
            fallbackTolerance: 3, // So that we can select items on mobile
            animation: 150
        });
    }

    // Generate characters within lists
    step = 0;

    for (let i = 0; i < numberOfLists; i++) {
        charList = document.getElementById("character-list-" + i);
        sliceValue = charsPerList;

        if (i + 1 == numberOfLists) {
            sliceValue = remainder;
        }

        for (let line of splitContents.slice(step, (step + sliceValue))) {

            if (checkedValue) {
                line = line.split("|")[0];
            }

            charList.insertAdjacentHTML('beforeend', '<li class="list-group-item">' + line + '</li>');
        }

        step += sliceValue;
    }
}

function generateCommand(command, isNote = false, note = null) {
    charArray = [];

    // Get all items for each list
    lists = document.getElementsByClassName("char-list-class");
    console.log(lists);
    for (let list of lists)
    {
        charactersHTML = list.innerHTML;
        splitList = charactersHTML.split("</li>");

        if (splitList[splitList.length - 1] == "")
            splitList.pop();

        for (let line of splitList) {
            charArray.push(line.split('\">')[1].split(" | ")[0].toLowerCase()); // Can probably change this to a regex
        }
    }

    commandField = document.getElementById("command");
    commandField.value = "";
    commandField.value = "$" + command + charArray.join("$");

    if (isNote) {
        commandField.value += "$" + note
    }
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