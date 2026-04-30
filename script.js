// Grab the calculator container for event delegation
const calculator = document.querySelector('.calculator');
// Grab the display input element to update the UI
const display = document.getElementById('display');

// The 'state' object holds all necessary data for the calculator's operation
const state = {
    currentValue: '', // The value currently being typed or displayed
    previousValue: null, // The first operand in a calculation
    operator: null, // The current arithmetic operator (+, -, *, /)
    waitingForNewValue: false // Flag to know if the next number typed should start a new value
};

// Object containing arrow functions for basic arithmetic operations
const calculate = {
    '/': (prev, current) => current === 0 ? 'Error' : prev / current,
    '*': (prev, current) => prev * current,
    '+': (prev, current) => prev + current,
    '-': (prev, current) => prev - current,
    '=': (prev, current) => current
};

// Function to update the DOM element with the full equation or current value
function updateDisplay() {
    if (state.currentValue === 'Error') {
        display.value = 'Error';
        return;
    }

    // If we have an operator and are waiting for the next number, show e.g., "5 +"
    if (state.operator && state.waitingForNewValue) {
        display.value = `${state.previousValue} ${state.operator}`;
    } 
    // If we have an operator and are actively typing the next number, show e.g., "5 + 3"
    else if (state.operator && !state.waitingForNewValue) {
        display.value = `${state.previousValue} ${state.operator} ${state.currentValue}`;
    } 
    // Otherwise, just show the current number
    else {
        display.value = state.currentValue;
    }
}

// Function to handle number button clicks
function handleNumber(number) {
    // Reset calculator if we are in an Error state
    if (state.currentValue === 'Error') {
        resetCalculator();
    }
    
    // If waiting for a new value (e.g. after pressing '+'), overwrite the display
    if (state.waitingForNewValue) {
        state.currentValue = number;
        state.waitingForNewValue = false;
    } else {
        // Append number (if '0', replace it to avoid '05')
        state.currentValue = state.currentValue === '0' ? number : state.currentValue + number;
    }
}

// Function to handle decimal point
function handleDecimal(dot) {
    // Clear out errors before typing
    if (state.currentValue === 'Error') {
        resetCalculator();
    }

    // If starting a new number with a decimal
    if (state.waitingForNewValue) {
        state.currentValue = '0.';
        state.waitingForNewValue = false;
        return;
    }
    
    // Prevent multiple decimal points in a single number string
    if (!state.currentValue.includes(dot)) {
        state.currentValue += state.currentValue === '' ? '0.' : dot;
    }
}

// Function to handle arithmetic operators
function handleOperator(nextOperator) {
    if (state.currentValue === 'Error') {
        resetCalculator();
        return;
    }

    // Default to 0 if the display is empty when an operator is pressed
    const inputValue = parseFloat(state.currentValue || 0);

    // If an operator already exists and we are waiting for a new value, just update the operator
    if (state.operator && state.waitingForNewValue) {
        state.operator = nextOperator;
        return;
    }

    // If there is no previous value, store the current input
    if (state.previousValue == null && !isNaN(inputValue)) {
        state.previousValue = inputValue;
    } else if (state.operator) {
        // Perform calculation if we already have an operator and a previous value
        const result = calculate[state.operator](state.previousValue, inputValue);
        
        if (result === 'Error') {
            state.currentValue = 'Error';
            state.previousValue = null;
        } else {
            // Limit decimal places to avoid floating point precision issues (e.g. 0.1 + 0.2)
            state.currentValue = `${parseFloat(result.toFixed(10))}`;
            state.previousValue = result;
        }
    }

    // Prepare for the next number input
    state.waitingForNewValue = true;
    state.operator = nextOperator;
}

// Resets all state variables back to their initial values
function resetCalculator() {
    state.currentValue = ''; 
    state.previousValue = null;
    state.operator = null;
    state.waitingForNewValue = false;
}

/* 
 * Event Delegation: Listen for clicks on the parent calculator container
 * instead of adding individual event listeners to each button.
 * This is better for performance and cleaner code.
 */
calculator.addEventListener('click', (event) => {
    // Destructure the target element from the event object
    const { target } = event;
    
    // Ignore clicks that are not on buttons (e.g. clicking the gaps between buttons)
    if (!target.matches('button')) {
        return;
    }

    // Retrieve the value of the button from its 'data-value' attribute
    const value = target.dataset.value;

    // Route the action based on the button's class list
    if (target.classList.contains('op')) {
        handleOperator(value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('equals')) {
        handleOperator(value);
        state.operator = null; // Clear operator so next number starts fresh
        updateDisplay();
        return;
    }

    if (value === '.') {
        handleDecimal(value);
        updateDisplay();
        return;
    }

    if (value === 'C') {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (value === '+/-') {
        if (state.currentValue === 'Error' || state.currentValue === '') return;
        state.currentValue = `${parseFloat(state.currentValue) * -1}`;
        updateDisplay();
        return;
    }

    if (value === '%') {
        if (state.currentValue === 'Error' || state.currentValue === '') return;
        state.currentValue = `${parseFloat(state.currentValue) / 100}`;
        updateDisplay();
        return;
    }

    // If it's none of the above, it must be a number
    handleNumber(value);
    
    // Always update the DOM display at the end of an action
    updateDisplay();
});

// Initialize display on first load
updateDisplay();
