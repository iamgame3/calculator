const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operation');
const clear = document.querySelector('.clear');
let Value1 = 0;
let Value2 = 0;
let func = 0;

let add = (a, b) => {
    return a + b;
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
    if (func == 'add') return add(a, b);
    if (func == 'subtract') return subtract(a, b);
    if (func == 'multiply') return multiply(a, b);
    if (func == 'divide') return divide(a, b);
};

digits.forEach(digit => digit.addEventListener('click', () => {
    if (display.textContent == 0) display.textContent = '';
    if (func && Value2 == 0) display.textContent = '';
    if (func) {
        display.textContent += digit.textContent;
        Value2 += digit.textContent;
        return;
    };
    display.textContent += digit.textContent;
    Value1 += digit.textContent;
}));

operators.forEach(operator => operator.addEventListener('click', () => {
    console.log(operator.textContent);
    func = operator.textContent;
}));

clear.addEventListener('click', () => {
    Value1 = 0;
    Value2 = 0;
    func = 0;
    display.textContent = 0;
});