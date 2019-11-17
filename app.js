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
    return a / b;
}

function operate(operator, a, b) {
    if(operator == 'add') {
        return add(a,b);
    } else if(operator == 'sub') {
        return subtract(a,b);
    } else if(operator == 'mul') {
        return multiply(a,b);
    } else{
        return divide(a,b);
    }
}

function operatorSign(operator) {
    if(operator === '+') {
        return 'add';
    } else if(operator === '-') {
        return 'sub';
    } else if(operator === 'x') {
        return 'mul';
    } else if(operator === '/') {
        return 'div';
    } else {
        return '';
    }
}

const screen = document.querySelector('.display');
let firstNum, secondNum, operator;

const container = document.querySelector('.container');
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
            console.log(secondNum);
            screen.value = '';
            screen.value = String(operate(operator, firstNum, secondNum));
            console.log(screen.value);
            firstNum = Number(screen.value);
            operator = operatorSign(e.target.textContent);
        } else {
            firstNum = Number(screen.value);
            console.log(firstNum);
            operator = operatorSign(e.target.textContent);
            console.log(operator);
            screen.value = '';
        }
        container.dataset.previousKeyType = 'operator';
    }

    //  Event Listener for the Equal button (i.e. =)
    if(e.target.classList.contains('calculate')){
        if(firstNum) {
            console.log(screen.value);
            screen.value = String(operate(operator, firstNum, Number(screen.value)));
            console.log(screen.value);
        }
    }

    //  Event Listener for the All Clear button (i.e. AC)
    if(e.target.classList.contains('clear')) {
        firstNum = '';
        secondNum = '';
        operator = '';
        screen.value = '';
    }

    //  Event Listener for the backspace button (i.e. C)
    if(e.target.classList.contains('backspace')) {
        screen.value = screen.value.slice(0, screen.value.length - 1);
    }
}