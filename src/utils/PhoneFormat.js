/*
  Phone Number Formatting:
   Automatically formats input fields as phone numbers in the format: (555) 555-5555.
   
   ----------------------
        Usage Examples
   ----------------------
    - SetUpPhoneFormatting('PhoneNumber');
 
 */

/**
 * Formats a phone number into the (555) 555-5555 format.
 *  textBox - The input field to format.
 */
function formatPhone(textBox) {
    let input = textBox.value.replace(/\D/g, '');
    
    if (input.length > 10) input = input.slice(0, 10);

    const parts = [];
    if (input.length > 0) parts.push('(' + input.slice(0, 3));
    if (input.length > 3) parts.push(') ' + input.slice(3, 6));
    if (input.length > 6) parts.push('-' + input.slice(6));

    textBox.value = parts.join('');
}

/**
 * Sets up phone number formatting for input fields with the specified class.
 *  className - The class name of the input fields to format.
 */
export function SetUpPhoneFormatting(className) {
    const inputs = document.querySelectorAll(`.${className}`);
    
    inputs.forEach(input => {
        if (!input.dataset.phoneFormattingAttached) {
            input.addEventListener('input', () => formatPhone(input));
            input.dataset.phoneFormattingAttached = 'true';
        }
        formatPhone(input);
    });
}
