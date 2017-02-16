
// TODO: DEFINE ANY VARIABLES HERE
const operators = ['*', '/', '+', '-'];
const compilers = ['=', 'c'];

let presses = [];
let operPresses = [];
let val1, val2;
let total = 0;

/**
 * 		EDIT ME!
 *
 * This function is called each time a button is clicked. You must decide what
 * to do in each case (most likely call another function).
 *
 * @param  {String} buttonValue   The value of the button that was clicked on, for example 6 or "+"
 */
function handleButtonClick(buttonValue) {
    // add buttonValue to current display html if buttonValue is not '=' or 'c'
    if (!compilers.includes(buttonValue)) {
      presses.push(buttonValue);
      updateDisplay(buttonValue);
    } else if (buttonValue === '=') {
      // find and store index of operators and their position in the equation
      for (let index = 0; index < presses.length; index++) {
        // find and store operator indexes
        if (operators.includes(presses[index])) {
          let opIndex = index;
          operPresses.push(opIndex);
        }
      }

      // keep showing current display if no operators were pressed
      if (operPresses.length === 0) {
        return;
      } else { // otherwise evaluate each expression and return total
        calculate();
      }
      clearDisplay();
      updateDisplay(total);
    }

    // clear display if buttonValue is 'c'
    if (buttonValue === 'c') {
      clearDisplay();
      presses = [];
      operPresses = [];
    }
}

function calculate() {
  let isRecursion = false;
  console.log(`p1: ${presses}`);
  console.log(`op1: ${operPresses}`);
  /*
    When '=' is pressed:
    1. combine pressed digits before first operator and store that value in val1 and total
    2. combine pressed digits after first operator up until the next operator or end of pressed and store in val2
    3. run expression with two values and update total
    4. remove everything already calculated from arrays
    5. if there are any operators remaining
    6. iterate calculate until no operations remain
  */
  // 1. combine pressed digits before first operator and store that value in total
  if (!isRecursion) {
    val1 = parseFloat((presses.slice(0, (operPresses[0] + 1)).join('')), 10);
    total = val1;
  }
  // 2. combine pressed digits after first operator up until the next operator or end of pressed
  if (operPresses[1]) {
    val2 = parseFloat(presses.slice(operPresses[0], (operPresses[1] + 1)).join(''), 10);
  } else {
    console.log('second');
    val2 = parseFloat(presses.slice((operPresses[0] + 1)).join(''));
  }
  // 3. run expression with two values and update total
  if (presses[operPresses[0]] === '+') {
    add(val2);
  } else if (presses[operPresses[0]] === '-') {
    subtract(val2);
  } else if (presses[operPresses[0]] === '*') {
    multiply(val2);
  } else if (presses[operPresses[0]] === '/') {
    divide(val2);
  }
  // 4. remove everything already calculated from arrays
  for (let index = 0; index <= operPresses[0]; index++) {
    presses.shift();
  }
  presses[0] = total;
  operPresses = [];
  for (let index = 0; index < presses.length; index++) {
    // find and store new operator indexes
    if (operators.includes(presses[index])) {
      let opIndex = index;
      operPresses.push(opIndex);
    }
  }
  console.log(`p2: ${presses}`);
  console.log(`op2: ${operPresses}`);
  console.log(total);
  // 5. if there are any operations remaining
  if (operPresses.length !== 0) {
    isRecursion = true;
    // 6. iterate calculate until no operations remain
    calculate();
  }
}


function add(num2) {
  total += parseFloat(num2, 10);
}
function subtract(num2) {
  total -= parseFloat(num2, 10);
}
function multiply(num2) {
  total *= parseFloat(num2, 10);
}
function divide(num2) {
  total /= parseFloat(num2, 10);
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
    clearDisplay();

    try {

        // Button click handler (addition)
        handleButtonClick(1);
        console.assert(testOutput.innerHTML === '1', 'pressing `1` did not result in "1" in the display (instead: ' + testOutput.innerHTML + ')');
        handleButtonClick(0);
        console.assert(testOutput.innerHTML === '10', testOutput.innerHTML, 'pressing `0` did not result in correct display (expected "10", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '10+', testOutput.innerHTML, 'pressing `+` did not result in correct display (expected "10+", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(7);
        console.assert(testOutput.innerHTML === '10+7', testOutput.innerHTML, 'pressing `7` did not result in correct display (expected "10+7", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '17', testOutput.innerHTML, 'pressing `=` did not result in correct display (expected "17", but saw: ' + testOutput.innerHTML + ')');

        // Clear
        handleButtonClick('c');
        console.assert(testOutput.innerHTML === '', testOutput.innerHTML, 'pressing `C` did not clear the display');
        handleButtonClick(1);
        handleButtonClick('+');
        handleButtonClick(1);
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '2', testOutput.innerHTML, 'Doing addition after clearing did not work! (`1+1=` expected to display: `2`, but saw: ' + testOutput.innerHTML + ')');

        // Subtraction
        handleButtonClick('c');
        handleButtonClick(7);
        handleButtonClick('-');
        handleButtonClick(2);
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '5', testOutput.innerHTML, '`7-2=` did not result in 5, instead: ' + testOutput.innerHTML + '');

        // Division
        handleButtonClick('c');
        handleButtonClick(7);
        handleButtonClick('/');
        handleButtonClick(2);
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '3.5', testOutput.innerHTML, '`7/2=` did not result in 3.5, instead: ' + testOutput.innerHTML + '');

        // Multiplication
        handleButtonClick('c');
        handleButtonClick(7);
        handleButtonClick('*');
        handleButtonClick(2);
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '14', testOutput.innerHTML, '`7*2=` did not result in 14, instead: ' + testOutput.innerHTML + '');

        console.info('All tests have run. (If you see no errors, they all passed!)');
        handleButtonClick('c');

    } catch(e) {
        console.error('There was a syntax error during the test run:', e);
    }
});

document.querySelector('.run-epic-tests').addEventListener('click', function() {
    console.info('Running EPIC tests...');
    var testOutput = document.querySelector('.display figure');
    clearDisplay();

    try {

        // Button click handler (addition)
        handleButtonClick(1);
        console.assert(testOutput.innerHTML === '1', 'pressing `1` did not result in "1" in the display (instead: ' + testOutput.innerHTML + ')');
        handleButtonClick(3);
        console.assert(testOutput.innerHTML === '13', testOutput.innerHTML, 'pressing `3` did not result in correct display (expected "13", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '13+', testOutput.innerHTML, 'pressing `+` did not result in correct display (expected "13+", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(7);
        console.assert(testOutput.innerHTML === '13+7', testOutput.innerHTML, 'pressing `7` did not result in correct display (expected "13+7", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '20', testOutput.innerHTML, 'pressing `=` did not result in correct display (expected "20", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '20+', testOutput.innerHTML, 'pressing `+` did not result in correct display (expected "20+", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(5);
        console.assert(testOutput.innerHTML === '20+5', testOutput.innerHTML, 'pressing `5` did not result in correct display (expected "20+5", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '25', testOutput.innerHTML, 'pressing `=` did not result in correct display (expected "25", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('/');
        console.assert(testOutput.innerHTML === '25/', testOutput.innerHTML, 'pressing `/` did not result in correct display (expected "25/", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(1);
        console.assert(testOutput.innerHTML === '25/1', testOutput.innerHTML, 'pressing `1` did not result in correct display (expected "25/1", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(0);
        console.assert(testOutput.innerHTML === '25/10', testOutput.innerHTML, 'pressing `0` did not result in correct display (expected "25/10", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '2.5', testOutput.innerHTML, 'pressing `=` did not result in correct display (expected "2.5", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('+');
        console.assert(testOutput.innerHTML === '2.5+', testOutput.innerHTML, 'pressing `+` did not result in correct display (expected "2.5+", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(2);
        console.assert(testOutput.innerHTML === '2.5+2', testOutput.innerHTML, 'pressing `2` did not result in correct display (expected "2.5+2", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('.');
        console.assert(testOutput.innerHTML === '2.5+2.', testOutput.innerHTML, 'pressing `.` did not result in correct display (expected "2.5+2.", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick(3);
        console.assert(testOutput.innerHTML === '2.5+2.3', testOutput.innerHTML, 'pressing `3` did not result in correct display (expected "2.5+2.3", but saw: ' + testOutput.innerHTML + ')');
        handleButtonClick('=');
        console.assert(testOutput.innerHTML === '4.8', testOutput.innerHTML, 'pressing `=` did not result in correct display (expected "4.8", but saw: ' + testOutput.innerHTML + ')');

        console.info('All tests have run. (If you see no errors, they all passed!)');
        handleButtonClick('c');

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
    display.innerText += text;
}
function clearDisplay() {
    display.innerText = '';
}
