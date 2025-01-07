/**
 * Auto Sums Collection of Textboxes into Another Textbox
 *
 * This script automatically sums the values of textboxes with a specific class
 * and updates a designated textbox with the total. The total is formatted with commas.
 *
 * ----------------------
 *      Usage Examples
 * ----------------------
 * On page load, call the setup function with the class name/ID assigned to input fields:
 * 
 *     setUpSumValue("Amount", "TotalAmount");
 *
 */

/**
 * Sets up automatic summation for textboxes with the specified class.
 *  textboxClass - Class name of the textboxes to sum.
 *  totalId - ID of the textbox where the total will be displayed.
 */
export function SetUpSumValue(textboxClass, totalId) {
    const textboxes = document.querySelectorAll(`.${textboxClass}`);
    const totalBox = document.getElementById(totalId);

    if (!totalBox) {
        console.warn(`Total box with ID "${totalId}" not found.`);
        return;
    }

    textboxes.forEach(textbox => {
        textbox.addEventListener('input', () => updateTotal(textboxClass, totalId));

        updateTotal(textboxClass, totalId);
    });
}

/**
 * Updates the total value displayed in the target textbox by summing all inputs.
 *  textboxClass - Class name of the textboxes to sum.
 *  totalId - ID of the textbox where the total will be displayed.
 */
function updateTotal(textboxClass, totalId) {
    const textboxes = document.querySelectorAll(`.${textboxClass}`);
    let totalAmount = 0;

    textboxes.forEach(textbox => {
        const value = parseFloat(textbox.value.replace(/,/g, '')) || 0;
        totalAmount += value;
    });

    const totalBox = document.getElementById(totalId);
    totalBox.value = totalAmount.toLocaleString();
}
