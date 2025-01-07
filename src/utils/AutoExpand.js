
/*
    Auto expands TextArea input to fit contents

    ----------------------
        Initialization
    ----------------------
    On page load, call set up with class name assigned to input fields
        SetUpAutoExpand("ExpandingTextArea");
*/


let registeredTextareas = [];
let resizeTimeout;

export function SetUpAutoExpand(className) {
    const textareas = document.querySelectorAll('.' + className);
    registeredTextareas = [...textareas]; 

    textareas.forEach(function (textarea) {
        if (textarea.tagName.toLowerCase() === "textarea") {
            textarea.addEventListener("input", function () {
                expandElementHeight(this);
            });
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
    }, 100);
}

export function cleanUpAutoExpand() {
    // Remove event listeners for each textarea
    registeredTextareas.forEach(function (textarea) {
        textarea.removeEventListener("input", expandElementHeight);
    });
    registeredTextareas = [];

    window.removeEventListener("resize", handleResizeDebounced);
}
