/*
    Conditionally displays/hides some div depending on checkbox/radio button input

    SetUpRadioConditional:
        Assign a conditional display to a div based on the yes-no radio selection

    SetUpCheckboxConditional:
        Assign a showFor hideFor mapping based on some checkboxID and some array of showFor div IDs, and optional hideFor div IDs

    SetUpSingleSelectCheck:
        Assign a checkbox class to only allow one checkbox of a given class to be checked

    ----------------------
        Initialization
    ----------------------
    On page load, call set up with ID assigned to input fields/div
        SetUpCheckboxConditionalMap('CheckBoxID', ['ConditionalDiv'], ['ConditionalDiv2']);
        SetUpRadioConditional('YesRadio', 'NoRadio', 'ConditionalDiv');
*/


//Conditionally display div of divID if yes radio button is checked
//      yesRadioID: ID of the radioButton that will display the div if selected
//      noRadioID: ID of the radioButton that will hide the div if selected
//      divID: ID of the div to be hidden/displayed. Defaults to hidden with no input
export function SetUpRadioConditional(yesRadioID, noRadioID, divID) {
    var yesRadioBtn = document.getElementById(yesRadioID);
    var noRadioBtn = document.getElementById(noRadioID);
    var divToShowHide = document.getElementById(divID);

    // Function to toggle the visibility of the div based on the radio button's checked status
    function toggleDiv() {
        if (yesRadioBtn.checked) {
            divToShowHide.style.display = "block";
        } else {
            divToShowHide.style.display = "none";
        }
    }
    // Call the toggleDiv function to set the initial state
    toggleDiv();
    // Add event listener to the yes radio button to trigger the toggleDiv function
    yesRadioBtn.addEventListener("change", toggleDiv);
    // Add event listener to the no radio button to trigger the toggleDiv function
    noRadioBtn.addEventListener("change", toggleDiv);
}


//Register a mapping of what divs to show or hide if the checkbox with ID checkID is selected
//  checkID: id of checkBox to be monitored
//  showMapping: array of Div id's to be shown if the checkbox is selected
//  hideMapping: optinal array of Div id's to be hidden if the checkbox is selected
export function SetUpCheckboxConditional(checkID, showMapping, hideMapping = null) {
    var checkBox = document.getElementById(checkID);
    // Function to toggle the visibility of the div based on the radio button's checked status
    function toggleDiv() {
        (showMapping || []).forEach(divID => {
            const divToShow = document.getElementById(divID);
            if (divToShow) {
                if (checkBox.checked) {
                    divToShow.style.display = "block";
                } else {
                    divToShow.style.display = "none";
                }
            }
        });
        (hideMapping || []).forEach(divID => {
            const divToHide = document.getElementById(divID);
            if (divToHide) {
                if (!checkBox.checked) {
                    divToHide.style.display = "block";
                } else {
                    divToHide.style.display = "none";
                }
            }
        });
    }
    // Call the toggleDiv function to set the initial state
    toggleDiv();
    // Add event listener to the checks to trigger the toggleDiv function
    checkBox.addEventListener("change", toggleDiv);
}


// Allow only one checkbox of given className to be selected
//      className: className of the checkbox(es) that only allow one of given class to be selected
export function SetUpSingleSelectCheck(className) {
    const checkboxes = document.querySelectorAll('.' + className);
    function toggleCheck() {
        if (this.checked) {
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== this && otherCheckbox.checked) {
                    otherCheckbox.checked = false;
                    // Manually dispatch a change event to trigger conditional logic tied to checkbox being unchecked
                    const event = new Event('change', { bubbles: true });
                    otherCheckbox.dispatchEvent(event);
                }
            });
        }
    }
    checkboxes.forEach(checkbox => {
        // Set the initial state if required
        if (checkbox.checked) {
            toggleCheck.call(checkbox);
        }
        checkbox.addEventListener("change", toggleCheck);
    });
}
