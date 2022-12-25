function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b) {
    return b == '0' ? 'Math Error' : a / b;
}

function modulus(a, b) {
    return b == '0' ? 'Math Error' : ((a % b) + b) % b;
}

function operate(operator, a, b) {
    if(operator == '+') {
        return add(a,b);
    } else if(operator == '-') {
        return subtract(a,b);
    } else if(operator == 'x' || operator == '*') {
        return multiply(a,b);
    } else if (operator == '/' || operator == '') {
        return divide(a,b);
    } else if (operator == '%') {
        return modulus(a,b);
    }
}

//  Calculate Function to calculate the value when '=' sign is clicked
function calc() {
    screen.value = !isNaN(operate(operator, firstNum, Number(screen.value))) ? +operate(operator, firstNum, Number(screen.value)).toFixed(4) : operate(operator, firstNum, Number(screen.value));
    firstNum = '';
}

//  Get the display
const screen = document.querySelector('.display');
let firstNum, secondNum, operator;

const container = document.querySelector('.container');
//  Add event listener to the calculator buttons
container.addEventListener('click', getNumber);

function getNumber(e) {
    //  Event Listener for all the Number buttons
    if(e.target.classList.contains('number')) {
        const previousKeyType = container.dataset.previousKeyType;
        if(previousKeyType === 'operator') {
            screen.value = '';
        }
        if(e.target.textContent == '.') {
            if(!screen.value.includes('.')) {
                screen.value += String(e.target.textContent);
            }
        } else {
            screen.value += String(e.target.textContent);
        }
        container.dataset.previousKeyType = 'number';
    }

    //  Event Listener for all the Operator buttons
    if(e.target.classList.contains('operator')) {
        if(firstNum) {
            secondNum = Number(screen.value);
            screen.value = '';
            screen.value = !isNaN(operate(operator, firstNum, secondNum)) ? +operate(operator, firstNum, secondNum).toFixed(4) : operate(operator, firstNum, secondNum);
            firstNum = Number(screen.value);
            operator = e.target.textContent;
        } else {
            firstNum = Number(screen.value);
            operator = e.target.textContent;
            screen.value = '';
        }
        container.dataset.previousKeyType = 'operator';
    }

    //  Event Listener for the Equal button (i.e. =)
    if(e.target.classList.contains('calculate')){
        if(firstNum) {
            calc();
        }
    }

    //  Event Listener for the All Clear button (i.e. AC)
    if(e.target.classList.contains('clear')) {
        firstNum = secondNum = operator = screen.value = '';
    }

    //  Event Listener for the backspace button (i.e. C)
    if(e.target.classList.contains('backspace')) {
        screen.value = screen.value.slice(0, screen.value.length - 1);
    }
}

document.addEventListener('keydown', e => {
    const keyName = e.key;
    if(!isNaN(keyName)) {
        const previousKeyType = container.dataset.previousKeyType;
        if(previousKeyType === 'operator') {
            screen.value = '';
        }
        screen.value += keyName;
        container.dataset.previousKeyType = 'number';
    }

    if(keyName === 'Backspace') {
        screen.value = screen.value.slice(0, screen.value.length - 1);
    }

    if(keyName === '.') {
        if(!screen.value.includes('.')) {
            screen.value += keyName;
        }
    }

    if(keyName === '+' || keyName === '-' || keyName === '*' || keyName === '/' || keyName === '%') {
        if(firstNum) {
            secondNum = Number(screen.value);
            screen.value = '';
            screen.value = !isNaN(operate(operator, firstNum, secondNum)) ? +operate(operator, firstNum, secondNum).toFixed(4) : operate(operator, firstNum, secondNum);
            firstNum = Number(screen.value);
            operator = keyName;
        } else {
            firstNum = Number(screen.value);
            operator = keyName;
            screen.value = '';
        }
        container.dataset.previousKeyType = 'operator';
    }

    if(keyName === '=' || keyName === 'Enter') {
        if(firstNum) {
            calc();
        }
    }
});