/*
    Appends a Character Remaining Count below a TextArea.

    Usage:
    Call SetUpCharCounter("TextareaID");

    Notes:
    - Textarea must include a "data-val-length-max" attribute for max character count.
    - Counter dynamically updates on user input.
*/

export function SetUpCharCounter(textareaId) {
    const CLASS_DANGER = "text-danger";
    const CLASS_HIDDEN = "d-none";
    const DEFAULT_MAX_LENGTH = 200;

    const textarea = document.querySelector(`#${textareaId}`);
    if (!textarea) {
        console.error(`Textarea with ID: ${textareaId} not found.`);
        return;
    }

    const maxLen = parseInt(textarea.getAttribute("data-val-length-max")) || DEFAULT_MAX_LENGTH;
    if (isNaN(maxLen)) {
        console.warn(`Invalid "data-val-length-max" attribute for textarea with ID: ${textareaId}. Defaulting to ${DEFAULT_MAX_LENGTH}.`);
    }

    const existingCounter = document.querySelector(`#${textareaId}CounterContainer`);
    if (existingCounter) {
        console.warn(`Counter already exists for textarea with ID: ${textareaId}`);
        return;
    }

    const counterContainer = document.createElement("div");
    counterContainer.id = `${textareaId}CounterContainer`;
    counterContainer.className = "d-flex justify-content-end"; // Add custom classes if needed

    textarea.parentNode.insertBefore(counterContainer, textarea.nextSibling);

    const wordCount = document.createElement("span");
    wordCount.id = `${textareaId}Words`;
    wordCount.className = CLASS_HIDDEN;

    const textcount = document.createElement("span");
    textcount.id = `${textareaId}Text`;
    wordCount.textContent = "Characters Remaining - ";
    wordCount.appendChild(textcount);

    counterContainer.appendChild(wordCount);

    function updateCharCount() {
        const textareaValue = textarea.value.length;
        const remainingChars = maxLen - textareaValue;

        textcount.textContent = remainingChars;

        if (textareaValue > maxLen) {
            textcount.classList.add(CLASS_DANGER);
            textarea.classList.add("textarea_danger");
        } else {
            textcount.classList.remove(CLASS_DANGER);
            textarea.classList.remove("textarea_danger");
        }

        if (textareaValue < 1) {
            wordCount.classList.add(CLASS_HIDDEN);
        } else {
            wordCount.classList.remove(CLASS_HIDDEN);
        }
    }

    textarea.addEventListener("input", updateCharCount);
    updateCharCount();
}
