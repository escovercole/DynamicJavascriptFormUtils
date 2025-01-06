/*
    CurrencyFormatting:
        Auto formats and limits input as comma separated decimal values: 9,999,999.99

    IntegerFormatting:
        Auto formats and limits input as integer values (default comma separated): 999,999
                                                        (applyCommas arg = false): 999999

    ----------------------
        Initialization
    ----------------------
    On page load, call set up with class names assigned to input fields
        SetUpCommaFormatting('CurrencyNumber')
        SetUpIntegerFormatting('IntegerNumber')
        SetUpIntegerFormatting('SmallerNumber', false)

*/




// Function to remove commas from input fields
function RemoveCommas(classGroup) {
    var listOfElements = document.getElementsByClassName(classGroup);
    for (var i = 0; i < listOfElements.length; i++) {
        listOfElements[i].value = listOfElements[i].value.replace(/,/g, '');
    }
}

// Function to format commas
function FormatCommas(ref) {
    var $input = $(ref);
    var inputValue = $input.val().trim();
    var num = inputValue.replace(/[^\d.]+/g, ''); // Preserve decimal point

    if (num === "") {
        $input.val(num);
    } else {
        $input.val(MakeCommaNumber(num));
    }
}

// Format number with commas. Max length of 9 digits before decimal
function MakeCommaNumber(num) {
    // Remove any non-digit characters except for decimal points
    num = num.replace(/[^\d.]/g, '');

    // Split the number into integer and decimal parts
    var parts = num.split('.');

    // If there's no integer part, default to '0'
    if (parts[0].length === 0) {
        parts[0] = '0';
    }

    // Format the integer part with commas
    parts[0] = parseInt(parts[0].replace(/\D/g, ""), 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Ensure there are at most two decimal places
    if (parts.length > 1) {
        parts[1] = parts[1] ? parts[1].slice(0, 2) : '';
    }

    // Concatenate integer and decimal parts back together
    var result = parts.join('.');

    // Ensure the number does not exceed 11 digits before the decimal point
    if (result.split('.')[0].length > 11) {
        // Truncate the integer part if it exceeds the limit
        result = result.substring(result.length - 11);
    }

    // Ensure there's only one decimal point
    var decimalCount = result.split('.').length - 1;
    if (decimalCount > 1) {
        // Remove all but the first decimal point
        result = result.replace(/\./g, function (match, idx) {
            return idx === result.indexOf('.') ? '.' : '';
        });
    }

    return result;
}

// Attach event listener to input fields with a specific class
export function SetUpCommaFormatting(className) {
    $('.' + className).each(function () {
        // Check if input event listener is already attached
        if (!$(this).data('inputEventListenerAttached')) {
            // Attach input event listener
            $(this).on('input', function () {
                FormatCommas(this);
            });
            // Set a flag indicating that the event listener is attached
            $(this).data('inputEventListenerAttached', true);
        }

        // Call comma formatting function initially
        FormatCommas(this);
    });
}



//Allow only integer input. Max length of 9
function FormatInteger(ref, applyCommas) {
    var $input = $(ref);
    var inputValue = $input.val().trim();
    var num = inputValue.replace(/[^\d]+/g, ''); 

    if (num.length > 9) {
        // Truncate the integer part if it exceeds the limit
        num = num.substring(num.length - 9);
    }
    if (num.length > 0 && applyCommas) {
        num = MakeCommaNumber(num);
    }

    $input.val(num);
}
export function SetUpIntegerFormatting(className, applyCommas = true) {
    $('.' + className).each(function () {
        // Check if input event listener is already attached
        if (!$(this).data('inputEventListenerAttached')) {
            // Attach input event listener
            $(this).on('input', function () {
                FormatInteger(this, applyCommas);
            });
            // Set a flag indicating that the event listener is attached
            $(this).data('inputEventListenerAttached', true);
        }

        FormatInteger(this, applyCommas);
    });
}