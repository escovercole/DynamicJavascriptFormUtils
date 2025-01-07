
/*
    Auto expands TextArea input to fit contents

    ----------------------
        Initialization
    ----------------------
    On page load, call set up with class name assigned to input fields
        SetUpAutoExpand("ExpandingTextArea");
*/


function expandElementHeight(element) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
}

let registeredTextareas = [];

export function SetUpAutoExpand(className) {
    const textareas = document.querySelectorAll('.' + className);
    registeredTextareas = [...textareas]; // Store references

    textareas.forEach(function (textarea) {
        if (textarea.tagName.toLowerCase() === "textarea") {
            textarea.addEventListener("input", function () {
                expandElementHeight(this);
            });
            expandElementHeight(textarea);
        }
    });

    window.addEventListener("resize", handleResize);
}

function handleResize() {
    registeredTextareas.forEach(expandElementHeight);
}

export function cleanUpAutoExpand() {
    registeredTextareas.forEach(function (textarea) {
        textarea.removeEventListener("input", expandElementHeight);
    });
    registeredTextareas = [];
    window.removeEventListener("resize", handleResize);
}
