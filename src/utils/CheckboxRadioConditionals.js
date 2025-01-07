/*
    Conditionally displays/hides divs based on checkbox or radio button inputs.

    Functions:
    - SetUpRadioConditional:
        Assign conditional display behavior to a div based on yes-no radio selection.
    - SetUpCheckboxConditional:
        Assign show/hide mappings to a div based on a checkbox state.
    - SetUpSingleSelectCheck:
        Ensure only one checkbox in a group can be selected.

    ----------------------
        Usage Examples
    ----------------------
    On page load, initialize with:
    - SetUpCheckboxConditional('CheckBoxID', ['ConditionalDiv'], ['OptionalHideDiv']);
    - SetUpRadioConditional('YesRadioID', 'NoRadioID', 'ConditionalDiv');
    - SetUpSingleSelectCheck('CheckboxGroupClassName');
*/

function toggleVisibility(element, show) {
    if (element) {
        element.style.display = show ? "block" : "none";
    }
}

/** Conditionally display a div based on yes/no radio button selection.
 *  yesRadioID - ID of the "Yes" radio button.
 *  noRadioID - ID of the "No" radio button.
 *  divID - ID of the div to be shown/hidden.
 */
export function SetUpRadioConditional(yesRadioID, noRadioID, divID) {
    const yesRadio = document.getElementById(yesRadioID);
    const noRadio = document.getElementById(noRadioID);
    const targetDiv = document.getElementById(divID);

    if (!yesRadio || !noRadio || !targetDiv) {
        console.error(`Invalid IDs provided to SetUpRadioConditional: ${yesRadioID}, ${noRadioID}, ${divID}`);
        return;
    }

    const toggleDiv = () => toggleVisibility(targetDiv, yesRadio.checked);

    toggleDiv();
    yesRadio.addEventListener("change", toggleDiv);
    noRadio.addEventListener("change", toggleDiv);
}

/** Register a mapping to conditionally show/hide divs based on a checkbox state.
 *  checkID - ID of the checkbox to monitor.
 *  showMapping - Array of IDs of divs to be shown when checkbox is checked.
 *  hideMapping - Array of IDs of divs to be hidden when checkbox is checked.
 */
export function SetUpCheckboxConditional(checkID, showMapping, hideMapping = []) {
    const checkBox = document.getElementById(checkID);

    if (!checkBox) {
        console.error(`Checkbox with ID ${checkID} not found.`);
        return;
    }

    const toggleDivs = () => {
        showMapping.forEach(divID => toggleVisibility(document.getElementById(divID), checkBox.checked));
        hideMapping.forEach(divID => toggleVisibility(document.getElementById(divID), !checkBox.checked));
    };

    toggleDivs();
    checkBox.addEventListener("change", toggleDivs);
}

/** Allow only one checkbox in a group (identified by className) to be selected at a time.
 *  className - Class name of the checkbox group.
 */
export function SetUpSingleSelectCheck(className) {
    const checkboxes = document.querySelectorAll(`.${className}`);

    if (checkboxes.length === 0) {
        console.warn(`No checkboxes found with the class: ${className}`);
        return;
    }

    const handleCheck = function () {
        if (this.checked) {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this && otherCheckbox.checked) {
                    otherCheckbox.checked = false;

                    const event = new Event("change", { bubbles: true });
                    otherCheckbox.dispatchEvent(event);
                }
            });
        }
    };

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) handleCheck.call(checkbox);
        checkbox.addEventListener("change", handleCheck);
    });
}
