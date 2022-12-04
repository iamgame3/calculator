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