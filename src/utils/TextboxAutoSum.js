
/*
    Auto sums collection of textboxes into another textbox

    ----------------------
        Initialization
    ----------------------
    On page load, call set up with class name/ID assigned to input fields
        SetUpSumValue("Amount", "TotalAmount");

*/

export function SetUpSumValue(textboxClass, totalId) {
    var textboxes = document.querySelectorAll('.' + textboxClass);
    textboxes.forEach(function (textbox) {
        textbox.addEventListener('input', function () {
            UpdateTotal(textboxClass, totalId);
        });
        UpdateTotal(textboxClass, totalId);
    });
}

function UpdateTotal(textboxClass, totalId) {
    var totalAmount = 0;
    $("." + textboxClass).each(function () {
        // Remove commas from the value before parsing
        var amount = parseFloat($(this).val().replace(/,/g, '')) || 0;
        totalAmount += amount;
    });
    // Format the total amount with commas
    $("#" + totalId).val(totalAmount.toLocaleString());
}

