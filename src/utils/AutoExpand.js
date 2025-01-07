
/*
    Auto expands TextArea input to fit contents.

    Usage:
    1. Call SetUpAutoExpand("MyTextAreaClassName") to initialize auto-expanding behavior.
    2. Call CleanUpAutoExpand() to remove event listeners and clean up resources.

    Notes:
    - Ensure the DOM is fully loaded before calling SetUpAutoExpand.
    - Default class name is "ExpandingTextArea" if none is provided.
*/


let registeredTextareas = [];
let resizeTimeout;
const DEBOUNCE_DELAY = 100;

export function SetUpAutoExpand(className = "ExpandingTextArea") {
    const textareas = document.querySelectorAll('.' + className);
    if (textareas.length === 0) {
        console.warn(`No textareas found with the class: ${className}`);
    }

    registeredTextareas = [...textareas]; 

    textareas.forEach(function (textarea) {
        if (textarea.tagName.toLowerCase() === "textarea") {
            textarea.addEventListener("input", function () {
                expandElementHeight(this);
            });
            textarea.setAttribute("style", "overflow-y:hidden;");
            expandElementHeight(textarea); 
        }
    });

    window.addEventListener("resize", handleResizeDebounced);
}

function expandElementHeight(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
}

function handleResizeDebounced() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        registeredTextareas.forEach(expandElementHeight);
    }, DEBOUNCE_DELAY);
}

export function CleanUpAutoExpand() {
    registeredTextareas.forEach(function (textarea) {
        if (document.body.contains(textarea)) {
            textarea.removeEventListener("input", expandElementHeight);
        }
    });
    registeredTextareas = [];

    window.removeEventListener("resize", handleResizeDebounced);
}
