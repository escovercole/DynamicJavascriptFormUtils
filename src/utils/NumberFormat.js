/*
    Currency and Integer Formatting:
    - Automatically formats input fields with comma-separated values.

    Functions:
    - RemoveCommas: Strips commas from input values.
    - SetUpCommaFormatting: Formats input fields as comma-separated decimal numbers, limiting to a specified number of digits before the decimal.
    - SetUpIntegerFormatting: Formats input fields as integers, optionally with commas, limiting to a specified number of digits.

    ----------------------
        Usage Examples
    ----------------------
    - SetUpCommaFormatting('CurrencyNumber', 9);
    - SetUpIntegerFormatting('IntegerNumber', true, 9);
    - SetUpIntegerFormatting('SmallerNumber', false, 5);
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

/** Format input as a comma-separated number, limiting to specified digits before the decimal.
 *  input - Input field element.
 *  limit - Maximum number of digits allowed before the decimal.
 */
function handleCommaFormatting(input, limit) {
    const value = input.value.trim();
    let sanitizedValue = value.replace(/[^\d.]/g, '');

    const [integer, decimal] = sanitizedValue.split('.');
    if (integer.length > limit) {
        sanitizedValue = integer.slice(0, limit) + (decimal ? '.' + decimal : '');
    }

    input.value = sanitizedValue ? formatWithCommas(sanitizedValue) : '';
}

/** Set up comma formatting for input fields.
 *  className - Class name of the input fields to format.
 *  limit - Maximum number of digits allowed before the decimal (default is 9).
 */
export function SetUpCommaFormatting(className, limit = 9) {
    document.querySelectorAll(`.${className}`).forEach(input => {
        if (!input.dataset.inputEventListenerAttached) {
            input.addEventListener('input', () => handleCommaFormatting(input, limit));
            input.dataset.inputEventListenerAttached = 'true';
        }

        handleCommaFormatting(input, limit);
    });
}

/** Format an integer with optional commas, limiting to specified digits.
 *  input - Input field element.
 *  applyCommas - Whether to format with commas.
 *  limit - Maximum number of digits allowed (default is 9).
 */
function handleIntegerFormatting(input, applyCommas, limit) {
    const value = input.value.trim();
    let sanitizedValue = value.replace(/[^\d]/g, '');

    if (sanitizedValue.length > limit) {
        sanitizedValue = sanitizedValue.slice(0, limit);
    }

    input.value = applyCommas ? formatWithCommas(sanitizedValue) : sanitizedValue;
}

/** Set up integer formatting for input fields.
 *  className - Class name of the input fields to format.
 *  applyCommas - Whether to apply commas to the formatted integers.
 *  limit - Maximum number of digits allowed (default is 9).
 */
export function SetUpIntegerFormatting(className, applyCommas = true, limit = 9) {
    document.querySelectorAll(`.${className}`).forEach(input => {
        if (!input.dataset.inputEventListenerAttached) {
            input.addEventListener('input', () => handleIntegerFormatting(input, applyCommas, limit));
            input.dataset.inputEventListenerAttached = 'true';
        }

        handleIntegerFormatting(input, applyCommas, limit);
    });
}
