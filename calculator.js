const calculator = { displayValue: '0', firstOperand: null, waitingForSecondOperand: false, operator: null };

function updateDisplay() {
    document.querySelector('.calculator-screen').value = calculator.displayValue;
}

function handleKeyPress(key) {
    if (key === 'all-clear') {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    } else if (key === '=') {
        if (calculator.operator) {
            const secondOperand = parseFloat(calculator.displayValue);
            calculator.displayValue = String(eval(`${calculator.firstOperand} ${calculator.operator} ${secondOperand}`));
            calculator.firstOperand = parseFloat(calculator.displayValue);
            calculator.waitingForSecondOperand = true;
        }
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (calculator.firstOperand == null) {
            calculator.firstOperand = parseFloat(calculator.displayValue);
        } else if (calculator.operator) {
            const result = eval(`${calculator.firstOperand} ${calculator.operator} ${parseFloat(calculator.displayValue)}`);
            calculator.displayValue = String(result);
            calculator.firstOperand = result;
        }
        calculator.operator = key;
        calculator.waitingForSecondOperand = true;
    } else if (key === '.') {
        if (!calculator.displayValue.includes('.')) {
            calculator.displayValue += '.';
        }
    } else {
        calculator.displayValue = calculator.waitingForSecondOperand ? key : calculator.displayValue === '0' ? key : calculator.displayValue + key;
        calculator.waitingForSecondOperand = false;
    }
    updateDisplay();
}

document.querySelector('.calculator_buttons').addEventListener('click', (event) => {
    if (event.target.matches('button')) handleKeyPress(event.target.value);
});

updateDisplay();
