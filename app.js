/*
Four function calculator written in Javscript. 
Made by Vinayak Trigunayat.
*/

const keys = document.querySelectorAll(".key");
let num1 = "0";
let num2 = "0";
let writingNum1 = true;
let currentOperator = "";

start();

/*
    Starts the program
*/

function start() {

    keys.forEach(key => {

        key.addEventListener("click", pressKey);
    })
    updateScreen(num1);
}

function removeLeadingZero(num) {

    return (Number(num).toString());
}

/*
    Changes the contents of the screen display
*/
function updateScreen(toDisplay) {
    const screenDisplay = document.querySelector(".screen");
    screenDisplay.innerText = toDisplay;
}

function getCurrentDisplay() {
    const screenDisplay = document.querySelector(".screen");
    return screenDisplay.innerText;
}

/*
    Switches which number is currently being written
*/
function switchNums() {

    writingNum1 = !writingNum1;
}

function writeNum1() {

    writingNum1 = true;
}

function writeNum2() {

    writingNum1 = false;
}

function insertAtIndex(ind,val,str) {

    let newStr = str.slice(0,(ind)) + val + str.slice(ind);
    return newStr;
}

/*
    When a digit is pressed
*/
function digit(e) {
    
    let digitVal = e.target.innerText;
    if (writingNum1) {
        if (num1.includes(".")) {
            //let decimalIndex = num1.indexOf(".");
            //num1 = removeLeadingZero(num1);
            num1 += digitVal;
            num1 = removeLeadingZero(num1);
            //if (!num1.includes(".")) {  
            //num1 = insertAtIndex(decimalIndex,".",num1);
            //}
            updateScreen(num1);
        }
        else {
            num1 = removeLeadingZero(num1);
            num1 += digitVal;
            num1 = removeLeadingZero(num1);  
            updateScreen(num1);
        }
    }
    else {  
        if (num2.includes(".")) {
            //let decimalIndex = num2.indexOf(".");
            //num2 = removeLeadingZero(num2);
            num2 += digitVal;
            num2 = removeLeadingZero(num2);
            //if (!num2.includes(".")) {  
            //num2 = insertAtIndex(decimalIndex,".",num2);
            //}
            updateScreen(num2);
        }
        else {
            num2 = removeLeadingZero(num2);
            num2 += digitVal;
            num2 = removeLeadingZero(num2);  
            updateScreen(num2);
        }
    }
}

function getResult(op) {
    switch(op) {

        case "*":
            return (Number(num1) * Number(num2)).toString();
            break;
        case "/":
            return (Number(num1) / Number(num2)).toString();
            break;
        case "+":
            return (Number(num1) + Number(num2)).toString();
            break;
        case "-":
            return (Number(num1) - Number(num2)).toString();
            break;
    }
}

/*
    When an operator is pressed
*/
function operator(e) {

    let operatorVal = e.target.innerText;

    if (writingNum1) {
        currentOperator = operatorVal;
        num2 = "0";
        switchNums();
    }
    else {
        num1 = getResult(currentOperator);
        updateScreen(num1);
        currentOperator = operatorVal;
        //num2 = "0";
        //switchNums();
    }
}

/*
    When the AC key is pressed
*/
function ac() {

    writeNum1();
    num1 = "0";
    num2 = "0"
    currentOperator = "";
    updateScreen(num1);

}

/*
    When the DEL key is pressed
*/
function del() {

    if (writeNum1) {

        if (num1.length <= 1) {

            num1 = "0";
        }
        else {

            num1 = num1.slice(0, -1);
        }
        updateScreen(num1);
    }
    else {

        if (num2.length <= 1) {

            num2 = "0";
        }
        else {

            num2 = num2.slice(0, -1);
        }
        updateScreen(num2);
    }

}

/*
    When the Equals key is pressed
*/
function equals() {

    if (currentOperator == "") { //If there is no operator yet then do nothing

        return;
    }

    num1 = getResult(currentOperator);
    writeNum1();
    //num2 = "0";
    updateScreen(num1);
}

function decimal() {

    if (writingNum1) {

        if (num1.includes(".")) {
            //alert("You already have a decimal.");
            return;
        }

        num1 = removeLeadingZero(num1);
        num1 += ".";
        updateScreen(num1);
    }
    else {
        if (num2.includes(".")) {
            //alert("You already have a decimal.");
            return;
        }

        num2 = removeLeadingZero(num2);
        num2 += ".";
        updateScreen(num2);
    }

}

/*
Handle the pressing of a key and call other functions as needed
*/
function pressKey(e) {

    let keyClass = e.target.classList;
    let keyVal = e.target.innerText;
    if (!(isNaN(keyVal))) { //Check if the key is a digit

        digit(e);
    }
    else if (keyClass.contains("key-divide") || //Check if the key is an operator
             keyClass.contains("key-multiply") ||
             keyClass.contains("key-subtract") || 
             keyClass.contains("key-add")) {

        operator(e);
    }
    else if (keyClass.contains("key-ac")) { //Check if the key is AC

        ac();
    }
    else if (keyClass.contains("key-del")) { //Check if the key is DEL

        del();
    }
    else if (keyClass.contains("key-equals")) { //Check if the key is equals

        equals();
    }
    else if (keyClass.contains("key-decimal")) { //Check if the key is decimal

        decimal(); 
    }

}