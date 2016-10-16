
// TODO: DEFINE ANY VARIABLES HERE


/**
 * 		EDIT ME!
 *
 * This function is called each time a button is clicked. You must decide what
 * to do in each case (most likely call another function).
 *
 * @param  {Number|String} buttonValue   The value of the button that was clicked on, for example 6 or "+"
 */
function handleButtonClick(buttonValue) {

    // TODO: WRITE YOUR CODE HERE

}



/** **************************************************************
 * These are our tests. If any of them fail you will see a message
 * in the developer tools "Console" - in which case the assignment
 * will NOT be considered complete!
 *
 *                  DO NOT CHANGE THESE LINES
 ****************************************************************/

document.querySelector('.run-tests').addEventListener('click', function() {
    console.info('Running tests...');
    var testOutput = document.querySelector('.display figure');
    updateDisplay('');

    try {

        // Button click handler (addition)
        handleButtonClick('1');
        console.assert(testOutput.innerHTML === '1', testOutput.innerHTML, 'pressing `1` did not result in "1" in the display');
        handleButtonClick('3');
        console.assert(testOutput.innerHTML === '13', testOutput.innerHTML, 'pressing `3` did not result in correct display (expected "13")');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '13+', testOutput.innerHTML, 'pressing `+` did not result in correct display (expected "13+")');
        handleButtonClick('7');
        console.assert(testOutput.innerHTML === '13+7', testOutput.innerHTML, 'pressing `7` did not result in correct display (expected "13+7")');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '20', testOutput.innerHTML, 'pressing `=` did not result in correct display (expected "20")');

        // Clear
        handleButtonClick('c');
        console.assert(testOutput.innerHTML === '', testOutput.innerHTML, 'pressing `C` did not clear the display');

        // Subtraction
        handleButtonClick('7');
        handleButtonClick('-');
        handleButtonClick('2');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '5', testOutput.innerHTML, '`7-2=` did not result in 5');

        // Division
        handleButtonClick('7');
        handleButtonClick('/');
        handleButtonClick('2');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '3.5', testOutput.innerHTML, '`7/2=` did not result in 3.5');

        // Multiplication
        handleButtonClick('7');
        handleButtonClick('*');
        handleButtonClick('2');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '14', testOutput.innerHTML, '`7*2=` did not result in 14');

        console.info('All tests have run. (If you see no errors, they all passed!)');
        updateDisplay('');

    } catch(e) {
        console.error('There was a syntax error during the test run:', e);
    }
});


/**
 * 		DO NOT CHANGE ANY LINES BELOW HERE!!
 *
 * This event handler will fire for ALL button clicks. You need to decide
 * what to do based on which button was clicked in the handler function
 * defined above.
 */
[].slice.call(document.querySelectorAll('button')).forEach(function(element) {
    element.addEventListener('click', function() {
        var val = this.value;
        if (Number(this.value) || this.value === '0') {
            val = Number(this.value);
        }
        handleButtonClick(val);
    });
});

var display = document.querySelector('.display figure');
function updateDisplay(text) {
    display.innerText = text;
}
