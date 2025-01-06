/*
    Appends a Character remining count below the textArea

    ----------------------
        Initialization
    ----------------------
    On page load, call set up with ID assigned to input field
        SetUpCharCounter("CountedProperty");
*/


//Adds a character remaining field to the text field based on the data-val-length-max property
//  textareaId: ID of the textarea to be counted
export default function SetUpCharCounter(textareaId) {
    const textcountId = textareaId + 'Text';
    const wordcountId = textareaId + 'Words'
    const textarea = document.querySelector("#" + textareaId);

    const counterContainer = document.createElement('div');
    counterContainer.id = textarea.id + 'CounterContainer'; // Set dynamic ID
    counterContainer.className = 'd-flex justify-content-end'; // Add any necessary classes

    // Insert the counter container after the textarea
    textarea.parentNode.insertBefore(counterContainer, textarea.nextSibling);

    // Dynamically create counter elements
    const wordCount = document.createElement("span");
    wordCount.id = wordcountId;
    wordCount.className = "d-none";
    wordCount.innerHTML = `Characters Remaining - <span id="${textcountId}"></span>`;
    counterContainer.appendChild(wordCount);

    const textcount = document.querySelector("#" + textcountId);
    // Get max length from data attribute
    const maxLen = parseInt(textarea.getAttribute("data-val-length-max")) || 200;

    function updateCharCount() {
        const textareaValue = textarea.value.length;

        textcount.innerHTML = maxLen - textareaValue;

        if (textareaValue > maxLen) {
            textcount.classList.add("text-danger");
            textarea.classList.add("textarea_danger");
        } else {
            textcount.classList.remove("text-danger");
            textarea.classList.remove("textarea_danger");
        }

        if (textareaValue < 1) {
            wordCount.classList.add("d-none");
        } else {
            wordCount.classList.remove("d-none");
        }
    }

    // Call updateCharCount on input event
    textarea.addEventListener("input", updateCharCount);

    // Initial call to update char count
    updateCharCount();
}
