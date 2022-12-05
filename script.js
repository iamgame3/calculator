const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operation');
const clear = document.querySelector('.clear');
const calculate = document.querySelector('#equals')
let result = 0;
let Value1 = 0;
let Value2 = '';
let func = 0;

let add = (a, b) => {
    return parseInt(a) + parseInt(b);
};

let subtract = (a, b) => {
    return a - b;
};

let multiply = (a, b) => {
    return a * b;
};

let divide = (a, b) => {
    return a / b;
};

let operate = (func, a, b) => {
    console.log(func, a, b);
    if (func == '+') return add(a, b);
    if (func == '-') return subtract(a, b);
    if (func == 'x') return multiply(a, b);
    if (func == '÷') return divide(a, b);
};

digits.forEach(digit => digit.addEventListener('click', () => {
    if (display.textContent == 0) display.textContent = '';
    if (func && Value2 == '') display.textContent = '';
    if (func) {
        display.textContent = digit.textContent;
        Value2 = digit.textContent;
        return;
    };
    display.textContent += digit.textContent;
    Value1 += digit.textContent;
}));

operators.forEach(operator => operator.addEventListener('click', () => {
    if (func == operator.textContent && Value1 && Value2) {
        display.textContent = operate(func, Value1, Value2);
        Value1 = operate(func, Value1, Value2);
        return;
    };
    if (func && Value1 && Value2) {
        display.textContent = operate(func, Value1, Value2);
        Value1 = operate(func, Value1, Value2);
        return func = operator.textContent;
    };
    func = operator.textContent;
}));

clear.addEventListener('click', () => {
    Value1 = 0;
    Value2 = 0;
    func = 0;
    result = 0;
    display.textContent = 0;
});

calculate.addEventListener('click', () => {
    display.textContent = operate(func, Value1, Value2);
    Value1 = operate(func, Value1, Value2);
});