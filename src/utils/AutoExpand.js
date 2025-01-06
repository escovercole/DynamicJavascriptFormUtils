
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

export default function SetUpAutoExpand(className) {
    const textareas = document.querySelectorAll('.' + className);

    textareas.forEach(function (textarea) {
        if (textarea.tagName.toLowerCase() === "textarea") {
            // Attach input event listener for auto-expand
            textarea.addEventListener("input", function () {
                expandElementHeight(this);
            });
            // Set initial height based on content
            expandElementHeight(textarea);
        }
    });

    // Adjust height on window resize for each textarea
    window.addEventListener("resize", function () {
        textareas.forEach(function (textarea) {
            expandElementHeight(textarea);
        });
    });
};
