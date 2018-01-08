var output = document.querySelector('.total');
var state = null; // null | num1phase | operator_phase | num2phase | total
var num1, global_operator, num2;

document.addEventListener('click', function(e) {
    var element = e.target;
    if(element.classList.contains('number')) {
        handleNumber(element.id);
    }
    else if (element.classList.contains('primary-operator')) {
        if (state !== null) // only run if value of output isn't 0
            handlePrimaryOperator(element.id);
    } else {
        if (state !== null) // only run if value of output isn't 0
            handleSecondaryOperator(element.id);
    }
});

// Handles numbers based on state of application
function handleNumber(num) {
    switch (state) {
        case null:
            if (num === 'dot') num = '.';
            output.innerHTML = num;
            document.getElementById('ac').innerHTML = 'C';
            state = 'num1phase';
            break;
        case 'num1phase':
            if (num === 'dot') num = '.';
            if(!checkLength(output.innerHTML))
                output.innerHTML += num;
            break;
        case 'operator_phase':
            if (num === 'dot') num = '.';
            output.innerHTML = num;
            state = 'num2phase';
            break;
        case 'num2phase':
            if (num === 'dot') num = '.';
            if(!checkLength(output.innerHTML))
                output.innerHTML += num;
            break;
    }
};

// Captures what operation will be performed
function handlePrimaryOperator(operator) {
    if (operator !== 'equal'&& num1 === undefined) {
        num1 = output.innerText;
        global_operator = operator;
        state = 'operator_phase';
    } else {
        num2 = output.innerText;
        calculate();
    }
}

function handleSecondaryOperator(operator) {
    let value = output.innerText; /// capture current value
    // determine what to do with clicked operator
    switch (operator) {
        case 'ac':
            reset()
            break;
        case 'plus-minus':
            // if current number is not negative, 'make it negative'. othewrise invert.
            !value.includes('-') ?
                output.innerHTML = `-${value}` :
                output.innerHTML = value.slice(1, value.length); 
            break;
        case 'percentage':
            output.innerHTML = parseFloat(value) / 100;
            break;
    }
}

// Make respective calculation based on chosen operator
function calculate() {
    switch (global_operator) {
        case 'add':
            output.innerHTML = parseFloat(num1) + parseFloat(num2);
            break;
        case 'subtract':
            output.innerHTML = parseFloat(num1) - parseFloat(num2);
            break;
        case 'multiply':
            output.innerHTML = parseFloat(num1) * parseFloat(num2);
            break;
        case 'divide':
            output.innerHTML = (parseFloat(num1) / parseFloat(num2)).toFixed(5);
            break;
    }
}

// Reset everything
function reset() {
    if (state !== null) {
        output.style.fontSize = '2.5em';
        output.innerHTML = '0';
        document.getElementById('ac').innerHTML = 'AC';
        state = null; num1 = undefined;
        num2 = undefined; operator = undefined;
        console.log(`state : ${state}`);
    } 
}

function checkLength(numberString, phase) {
    // add one to current length to check if adding
    // another number would give us too many numbers
    if (numberString.length + 1 == 8) {
        output.style.fontSize = '2.2em';
        return false;
    } else if (numberString.length + 1 == 9) {
        output.style.fontSize = '1.85em';
        return false;
    } else if (numberString.length + 1 == 10) {
        return true; // don't append any more numbers
    }
}
