const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operation');
const clear = document.querySelector('.clear');
const calculate = document.querySelector('#equals')
const del = document.querySelector('#delete');
const sign = document.querySelector('#sign');
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
    if (Value1 == "ERROR" || Value2 == "ERROR" || display.textContent == "ERROR") return ["ERROR", clearData(0)];
    if (!func) {
        if (Value1 == '') {
            Value1 = 0
            return [Value1, Value2New];
        }   else return [display.textContent, Value2New];
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
            if ((result.toString()).length > 9) {
                tempResult = result.toString()
                tempResultFixed = tempResult.slice(0, 9);
                result = parseFloat(tempResultFixed);
            };
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
    Value2New = 0;
    return [result, Value2New];
};

let digitPress = (a) => {
    if (Value1 == "ERROR" || Value2 == "ERROR" || display.textContent == "ERROR") return ["ERROR", clearData(0)];
    if (a.textContent) a = a.textContent;
    if (display.textContent === '0') display.textContent = '';
    if (func && Value2 == '') display.textContent = '';
    if (func && !Value2New) {
        display.textContent = a;
        Value2 = a;
        Value2New = 1;
        return;
    }
    if (display.textContent == 0 && !Value1) Value1 = '';
    if (func) {
        if (a == '.' && (display.textContent === '0' || display.textContent == '' || Value2 == '')) {
            display.textContent = '0.';
        }   else {
        display.textContent += a;
        };
        Value2 += a;
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
        return;
    };
    if (a == 0 && (display.textContent === '0' || display.textContent == '')) {
        display.textContent = a;
        Value1 = '';
        return;
    };
    if (a == '.' && (display.textContent === '0' || display.textContent == '')) {
        display.textContent = '0.';
    }   else {
    display.textContent += a;
    };
    Value1 += a;
    if (display.textContent.length > 9) {
        tempResultFixed = display.textContent.slice(0, 9);
        display.textContent = tempResultFixed;
        Value1 = display.textContent;
    };
    decimalCheck = display.textContent.split('.').length - 1;
    if (decimalCheck > 1) {
        tempResultFixed = display.textContent.slice(0, -1);
        display.textContent = tempResultFixed;
        Value2 = display.textContent;
    };
};

let operatorPress = (a) => {
    if (a.textContent) a = a.textContent;
    if (a == '*') a = 'x';
    if (a == '/') a = '÷';
    if (func == a && Value1 && Value2) {
        display.textContent = (operate(func, Value1, Value2))[0];
        Value1 = (operate(func, Value1, Value2))[0];
        return;
    };
    if (func && Value1 && Value2 && Value2New == 0) {
        return func = a;
    };
    if (func && Value1 && Value2) {
        display.textContent = (operate(func, Value1, Value2))[0];
        Value1 = (operate(func, Value1, Value2))[0];
        return func = a;
    };
    func = a;
}

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

let calculation = () => {
    display.textContent = (operate(func, Value1, Value2))[0];
    Value1 = (operate(func, Value1, Value2))[0];
};

let deletion = () => {
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
}

let signChange = () => {
    if (display.textContent == "ERROR") return;
    tempValue1 = '0' + Value1;
    tempValue2 = '0' + Value2;
    if (display.textContent == tempValue1 || display.textContent == Value1) {
        Value1 *= -1;
        display.textContent = Value1;
    }   else if (display.textContent == tempValue2 || display.textContent == Value2) {
        Value2 *= -1;
        display.textContent = Value2;
    };
};

digits.forEach(digit => digit.addEventListener('click', () => {
    digitPress(digit);
}));

operators.forEach(operator => operator.addEventListener('click', () => {
    operatorPress(operator);
}));

clear.addEventListener('click', () => {
    clearData(1);
});

calculate.addEventListener('click', calculation);

del.addEventListener('click', deletion);

sign.addEventListener('click', signChange);

document.addEventListener('keydown', (event) => {
    key = event.key;
    if (key == 'End') clearData(1);
    if (display.textContent == "ERROR") return;
    if (key == ' ') return;
    if (key == 'Enter' || key == ' ') event.preventDefault();
    if (isNaN(key) == false || key == '.') digitPress(key);
    if (key == '+' || key == '-' || key == '*' || key == '/') operatorPress(key);
    if (key == 'Enter' || key == '=') calculation();
    if (key == 'Backspace' || key == 'Delete') deletion();
    if (key == 'Insert') signChange();
});