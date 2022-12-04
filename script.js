let add = (a, b) => {
    return a + b;
};

let subtract = (a, b) => {
    return a - b;
};

const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit'); 
let displayValue = 0;

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
    console.log(digit.textContent)
    if (display.textContent == 0) display.textContent = '';
    display.textContent += digit.textContent;
    displayValue += digit.textContent;
}));