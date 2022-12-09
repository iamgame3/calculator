const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operation');
const clear = document.querySelector('.clear');
const calculate = document.querySelector('#equals')
const del = document.querySelector('#delete');
let result = 0;
let Value1 = '';
let Value2 = '';
let func = 0;
let Value2New = 0;

let add = (a, b) => {
    return parseFloat(a) + parseFloat(b);
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
    if (Value1 == "ERROR" || Value2 == "ERROR" || display.textContent == "ERROR") return ["ERROR", clearData(0)];
    if (!func) {
        if (Value1 == '') {
            Value1 = 0
            return [Value1, Value2New];
        }   else return [Value1, Value2New];
    };
    if (Value2 == '') return ["ERROR", clearData(0)];
    if (func == '+') result = add(a, b);
    if (func == '-') result = subtract(a, b);
    if (func == 'x') result = multiply(a, b);
    if (func == '÷' && Value2 == 0) return ["ERROR", clearData(0)];
    if (func == '÷') result = divide(a, b);
    if (!result && result !== 0) return ["ERROR", clearData(0)];
    if (result > 999999999) return ["ERROR", clearData(0)];
    if (result < 0.000001 && result !== 0) {
        if ((result + 0.000001) < 0) {
            Value2New = 0;
            return [result, Value2New];
        }   else {
        Value1 = "ERROR";
        return ["ERROR", Value1, clearData(0)];
        };
    };
    if ((result.toString()).length > 9) {
        tempResult = result.toString()
        tempResultFixed = tempResult.slice(0, 9);
        result = parseFloat(tempResultFixed);
    };
    console.log(result.length);
    Value2New = 0;
    return [result, Value2New];
};

let clearData = (a) => {
    if (!a) {
        display.textContent = "ERROR";
    }   else display.textContent = 0;
    if (Value1 == "ERROR" && !a) {
        Value1;
    }   else Value1 = '';
    Value2 = '';
    func = 0;
    result = 0;
    Value2New = 0;
};

digits.forEach(digit => digit.addEventListener('click', () => {
    console.log(Value1);
    console.log(Value2);
    if (Value1 == "ERROR" || Value2 == "ERROR" || display.textContent == "ERROR") return ["ERROR", clearData(0)];
    if (display.textContent === '0') display.textContent = '';
    if (func && Value2 == '') display.textContent = '';
    if (func && !Value2New) {
        display.textContent = digit.textContent;
        Value2 = digit.textContent;
        console.log("Hi");
        Value2New = 1;
        return;
    }
    if (display.textContent == 0 && !Value1) Value1 = '';
    if (func) {
        if (digit.textContent == '.' && (display.textContent === '0' || display.textContent == '')) {
            display.textContent = '0.';
        }   else {
        display.textContent += digit.textContent;
        };
        Value2 += digit.textContent;
        if (display.textContent.length > 9) {
            tempResultFixed = display.textContent.slice(0, 9);
            display.textContent = tempResultFixed;
            Value2 = display.textContent;
        };
        decimalCheck = display.textContent.split('.').length - 1;
        if (decimalCheck > 1) {
            tempResultFixed = display.textContent.slice(0, -1);
            display.textContent = tempResultFixed;
            Value2 = display.textContent;
        };
        console.log("Hello");
        return;
    };
    console.log("Greetings");
    if (digit.textContent == 0 && (display.textContent === '0' || display.textContent == '')) {
        display.textContent = digit.textContent;
        Value1 = '';
        return;
    };
    console.log('Good Day')
    if (digit.textContent == '.' && (display.textContent === '0' || display.textContent == '')) {
        display.textContent = '0.';
    }   else {
    display.textContent += digit.textContent;
    };
    Value1 += digit.textContent;
    if (display.textContent.length > 9) {
        tempResultFixed = display.textContent.slice(0, 9);
        display.textContent = tempResultFixed;
        Value1 = display.textContent;
    };
    decimalCheck = display.textContent.split('.').length - 1;
    console.log(decimalCheck);
    if (decimalCheck > 1) {
        tempResultFixed = display.textContent.slice(0, -1);
        display.textContent = tempResultFixed;
        Value2 = display.textContent;
    };
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

clear.addEventListener('click', () => {
    clearData(1);
});

calculate.addEventListener('click', () => {
    display.textContent = (operate(func, Value1, Value2))[0];
    Value1 = (operate(func, Value1, Value2))[0];
});

del.addEventListener('click', () => {
    if (display.textContent == "ERROR") return;
    if (Value2New = 1 && Value2) {
        display.textContent = Value2.slice(0, -1);
        Value2 = display.textContent;
        if (display.textContent == '') display.textContent = 0;
        return;
    } else if (Value1 == display.textContent) {
        display.textContent = Value1.slice(0, -1);
        Value1 = display.textContent;
        if (display.textContent == '') display.textContent = 0;
        return;
    };
});