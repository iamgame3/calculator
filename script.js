const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operation');
const clear = document.querySelector('.clear');
const calculate = document.querySelector('#equals')
let result = 0;
let Value1 = 0;
let Value2 = '';
let func = 0;
let Value2New = 0;

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
    if (func == '+') result = add(a, b);
    if (func == '-') result = subtract(a, b);
    if (func == 'x') result = multiply(a, b);
    if (func == '÷') result = divide(a, b);
    // Length greater than 9 and actual number greater than 999999999
    if (result > 999999999) return ["ERROR", clearData()];
    // if (result.length > 9)
    Value2New = 0;
    return [result, Value2New];
};

let clearData = () => {
    Value1 = 0;
    Value2 = 0;
    func = 0;
    result = 0;
    Value2New = 0;
    display.textContent = 0;
};

digits.forEach(digit => digit.addEventListener('click', () => {
    console.log(Value1);
    console.log(Value2);
    if (display.textContent == 0) display.textContent = '';
    if (func && Value2 == '') display.textContent = '';
    if (func && !Value2New) {
        display.textContent = digit.textContent;
        Value2 = digit.textContent;
        console.log("Hi");
        Value2New = 1;
        return;
    }
    if (func) {
        display.textContent += digit.textContent;
        Value2 += digit.textContent;
        console.log("Hello");
        return;
    };
    console.log("Greetings");
    display.textContent += digit.textContent;
    Value1 += digit.textContent;
}));

operators.forEach(operator => operator.addEventListener('click', () => {
    if (func == operator.textContent && Value1 && Value2) {
        display.textContent = (operate(func, Value1, Value2))[0];
        Value1 = (operate(func, Value1, Value2))[0];
        return;
    };
    if (func && Value1 && Value2 && Value2New == 0) {
        return func = operator.textContent;
    };
    if (func && Value1 && Value2) {
        display.textContent = (operate(func, Value1, Value2))[0];
        Value1 = (operate(func, Value1, Value2))[0];
        return func = operator.textContent;
    };
    func = operator.textContent;
}));

clear.addEventListener('click', clearData);

calculate.addEventListener('click', () => {
    display.textContent = (operate(func, Value1, Value2))[0];
    Value1 = (operate(func, Value1, Value2))[0];
});