/*
    Currency and Integer Formatting:
    - Automatically formats input fields with comma-separated values.

    Functions:
    - RemoveCommas: Strips commas from input values.
    - SetUpCommaFormatting: Formats input fields as comma-separated decimal numbers.
    - SetUpIntegerFormatting: Formats input fields as integers, optionally with commas.

    ----------------------
        Usage Examples
    ----------------------
    - SetUpCommaFormatting('CurrencyNumber');
    - SetUpIntegerFormatting('IntegerNumber');
    - SetUpIntegerFormatting('SmallerNumber', false);
*/

/** Remove commas from input values in fields with a specified class.
 *  classGroup - Class name of input fields.
 */
export function RemoveCommas(classGroup) {
    document.querySelectorAll(`.${classGroup}`).forEach(input => {
        input.value = input.value.replace(/,/g, '');
    });
}

/** Format a number string with commas (and optional decimal places).
 *  num - Input number as a string.
 */
function formatWithCommas(num) {
    num = num.replace(/[^\d.]/g, '');

    const [integer, decimal] = num.split('.');

    const formattedInteger = parseInt(integer || '0', 10)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const formattedDecimal = decimal ? decimal.slice(0, 2) : '';

    return formattedDecimal ? `${formattedInteger}.${formattedDecimal}` : formattedInteger;
}

/** Format input as a comma-separated number.
 *  input - Input field element.
 */
function handleCommaFormatting(input) {
    const value = input.value.trim();
    input.value = value ? formatWithCommas(value) : '';
}

/** Set up comma formatting for input fields.
 *  className - Class name of the input fields to format.
 */
export function SetUpCommaFormatting(className) {
    document.querySelectorAll(`.${className}`).forEach(input => {
        if (!input.dataset.inputEventListenerAttached) {
            input.addEventListener('input', () => handleCommaFormatting(input));
            input.dataset.inputEventListenerAttached = 'true';
        }

        handleCommaFormatting(input);
    });
}

/** Format an integer with optional commas.
 *  input - Input field element.
 *  applyCommas - Whether to format with commas.
 */
function handleIntegerFormatting(input, applyCommas) {
    const value = input.value.trim();
    let sanitizedValue = value.replace(/[^\d]/g, ''); // Remove non-digit characters.

    sanitizedValue = sanitizedValue.slice(0, 9);

    input.value = applyCommas ? formatWithCommas(sanitizedValue) : sanitizedValue;
}

/** Set up integer formatting for input fields.
 *  className - Class name of the input fields to format.
 *  applyCommas - Whether to apply commas to the formatted integers.
 */
export function SetUpIntegerFormatting(className, applyCommas = true) {
    document.querySelectorAll(`.${className}`).forEach(input => {
        if (!input.dataset.inputEventListenerAttached) {
            input.addEventListener('input', () => handleIntegerFormatting(input, applyCommas));
            input.dataset.inputEventListenerAttached = 'true';
        }

        handleIntegerFormatting(input, applyCommas);
    });
}
