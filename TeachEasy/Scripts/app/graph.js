const expressionInput = document.getElementById('eq');
var requestingEquationInput;//true if wait for equation input is happening
var equationInputWait;//how long the equation input has been waiting
var begString;//what the expression was before the user changed it
var equationErrLog = document.getElementById('equationErrLog');
//Prevent form submitting
$('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
})

function draw(graphNo) {
    try {
        // compile the expression once
        const expression = "y=" + expressionInput.value;
        begString = expression;//begString gets updated every draw()
        const expr = math.compile(expression);

        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(-10, 10, 0.5).toArray();
        const yValues = xValues.map(function (x) {
            return expr.eval({ x: x });
        });

        // render the plot using plotly
        const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
        };
        const data = [trace1];
        Plotly.newPlot('plot' + graphNo, data);
        equationErrLog.innerHTML = "";
    }
    catch (err) {
        //this automanically may happen, so don't let this specific error appear
        if (err.toString() != "ReferenceError: equationLog is not defined")
            equationErrLog.innerHTML = err;
    }
}

//closes the equation input div when exit button is clicked
function closeGraphEq() {
    document.getElementById("graphInfo").style.display = "none";
}

/*waits a second to check if the user is still typing out the graph equation. If
 * not, update the graph. */
function requestEquationInput() {
    graphEquations[curGraphNo] = expressionInput.value;

    if (!requestingEquationInput) {
        requestingEquationInput = true;
        equationInputWait = 0;

        //the updated expression string
        let curString = "y=" + expressionInput.value;

        let interval = window.setInterval(function () {
            equationInputWait++;

            //if the wait is complete and the equation isn't changed, do nothing
            if (equationInputWait == 10 && curString == begString) {
                equationInputWait = 0;
                requestingEquationInput = false;
                window.clearInterval(interval);
            }

            //otherwise, if the wait is complete and the equation is changed, draw()
            else if (equationInputWait == 10 && curString != begString) {
                //SHH
                if (expressionInput.value == "ecocity") {
                    Plotly.animate('plot' + curGraphNo, {
                        data: [{
                            y: [2, 4, 4, 10, 4, 4, 2, 2],
                            x: [-0.1, -0.1, -0.5, 0, 0.5, 0.1, 0.1, -0.1]
                        }],
                        traces: [0],
                        layout: {}
                    }, {
                            transition: {
                                duration: 500,
                                easing: 'cubic-in-out'
                            },
                            frame: {
                                duration: 500
                            }
                        });
                } else {
                    equationInputWait = 0;
                    requestingEquationInput = false;
                    draw(curGraphNo);
                    window.clearInterval(interval);
                }
            }
        }, 100);
    } else {//if the user keeps typing while the input is waiting, restart the wait
        equationInputWait = 0;
    }
}

//MATH KEYBOARD//////
//variables for all keys
var clearAllKey = document.getElementById("ac");
var exponentKey = document.getElementById("exp");
var factorialKey = document.getElementById("fac");
var piKey = document.getElementById("pi");
var leftBracketKey = document.getElementById("lBracket");
var rightBracketKey = document.getElementById("rBracket");
var modulusKey = document.getElementById("modulus");
var clearKey = document.getElementById("clear");
var squareRootKey = document.getElementById("sroot");
var cubeRootKey = document.getElementById("cubeRoot");
var sevenKey = document.getElementById("7");
var eightKey = document.getElementById("8");
var nineKey = document.getElementById("9");
var divisionKey = document.getElementById("div");
var sinKey = document.getElementById("sin");
var cosKey = document.getElementById("cos");
var tanKey = document.getElementById("tan");
var fourKey = document.getElementById("4");
var fiveKey = document.getElementById("5");
var sixKey = document.getElementById("6");
var multiplyKey = document.getElementById("mult");
var logKey = document.getElementById("log");
var lnKey = document.getElementById("ln");
var eKey = document.getElementById("e");
var oneKey = document.getElementById("1");
var twoKey = document.getElementById("2");
var threeKey = document.getElementById("3");
var subtractKey = document.getElementById("sub");
var decimalKey = document.getElementById("decimal");
var zeroKey = document.getElementById("0");
var plusKey = document.getElementById("plus");
var equalsKey = document.getElementById("equals");

//returns the px representation of the percent argument
function getWidthByPercent(percent) {
    return window.innerWidth / 100 * percent;
}

function getHeightByPercent(percent) {
    return window.innerHeight / 100 * percent;
}

//the y position of the keyboard
const endPageY = window.innerHeight;
var keyboard = document.getElementById("keyboard");
keyboard.style.top = endPageY + "px";

function highlightKey(key, color) {
    if (keyboardDisplay) {
        switch (key) {
            case '^':
                exponentKey.style.backgroundColor = color;
                break;
            case '!':
                factorialKey.style.backgroundColor = color;
                break;
            case '(':
                leftBracketKey.style.backgroundColor = color;
                break;
            case ')':
                rightBracketKey.style.backgroundColor = color;
                break;
            case '%':
                modulusKey.style.backgroundColor = color;
                break;
            case '7':
                sevenKey.style.backgroundColor = color;
                break;
            case '8':
                eightKey.style.backgroundColor = color;
                break;
            case '9':
                nineKey.style.backgroundColor = color;
                break;
            case '/':
                divisionKey.style.backgroundColor = color;
                break;
            case '4':
                fourKey.style.backgroundColor = color;
                break;
            case '5':
                fiveKey.style.backgroundColor = color;
                break;
            case '6':
                sixKey.style.backgroundColor = color;
                break;
            case '*':
            case 'x':
                multiplyKey.style.backgroundColor = color;
                break;
            case 'e':
                eKey.style.backgroundColor = color;
                break;
            case '1':
                oneKey.style.backgroundColor = color;
                break;
            case '2':
                twoKey.style.backgroundColor = color;
                break;
            case '3':
                threeKey.style.backgroundColor = color;
                break;
            case '-':
                subtractKey.style.backgroundColor = color;
                break;
            case '.':
                decimalKey.style.backgroundColor = color;
                break;
            case '0':
                zeroKey.style.backgroundColor = color;
                break;
            case '+':
                plusKey.style.backgroundColor = color;
                break;
            case '=':
                equalsKey.style.backgroundColor = color;
                break;
        }
    }
}

var equationFocus = false;//if the graph equation input has focus
function toggleEquationFocus() {
    equationFocus = (equationFocus) ? false : true;
}

expressionInput.onfocus = toggleEquationFocus;
expressionInput.onfocusout = toggleEquationFocus;

var grey = "#d4d4d4";
var darkGrey = "#808080";

//add event listeners for the keys so that the virtual keys get highlighted
window.onkeydown = function (e) {
    if (equationFocus)
        expressionInput.focus();
    highlightKey(e.key, darkGrey);
};

window.onkeyup = function (e) {
    highlightKey(e.key, grey);
};

function insertKeyToEquation(key) {
    expressionInput.value += key;
    requestEquationInput();
    expressionInput.focus();
}

function clearLastKeyEquation() {
    expressionInput.value = expressionInput.value.substring(0, expressionInput.value.length - 1);

    //check if the last value inputted is a keyword. If so, delete the keyword
    if (expressionInput.value.length == 3)//if there are only 3 characters, check for keyword
        clearKeyword(0);
    else if (expressionInput.value.length >= 4) {
        if (!clearKeyword(1))
            clearKeyword(0);//if no 4-letter keyword is found, check for a 3-letter keyword
    }

    expressionInput.focus();
}

//clears keywords. If param == 0, it clears any 3-letter keywords, if == 1, clears 4-letter keywords
//returns true if a keyword is cleared
function clearKeyword(val) {
    if (val == 0)
        switch (expressionInput.value.substring(expressionInput.value.length - 3, expressionInput.value.length)) {
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
                expressionInput.value = expressionInput.value.substring(0, expressionInput.value.length - 3);
                return true;
        }
    else
        switch (expressionInput.value.substring(expressionInput.value.length - 4, expressionInput.value.length)) {
            case 'sqrt':
            case 'cbrt':
                expressionInput.value = expressionInput.value.substring(0, expressionInput.value.length - 4);
                return true;
        }

    return false;
}

function clearEquation() {
    expressionInput.value = "x";
    requestEquationInput();
    expressionInput.focus();
}

//pulls up/down the virtual keyboard
var mobile;//if the screen is mobile. If so, only the phone keyboard is used.
var keyboardDisplay;
var keyboardToggling;//if the keyboard is being pulled up or down
function toggleKeyboard() {
    let dy;//endPageY - this = position of keyboard
    let scrollY = window.scrollY;

    if (!keyboardToggling) {
        keyboardToggling = true;

        if (!keyboardDisplay) {//if the keyboard isn't displayed, pull it up
            if (window.innerWidth < 500)//get rid of mobile keyboard
                graphInfo.focus();

            dy = 0;

            let interval = window.setInterval(function () {
                dy += 4;
                keyboard.style.top = endPageY - getHeightByPercent(dy) + "px";
                document.body.style.paddingBottom = getHeightByPercent(dy) + "px";

                if (dy == 40) {
                    keyboardToggling = false;
                    keyboardDisplay = true;
                    window.clearInterval(interval);
                }
            }, 25);
        } else {//if the keyboard is displayed, pull it down
            dy = 40;

            let interval = window.setInterval(function () {
                dy -= 4;
                keyboard.style.top = endPageY - getHeightByPercent(dy) + "px";
                document.body.style.paddingBottom = getHeightByPercent(dy) + "px";

                if (dy == 0) {
                    keyboardToggling = false;
                    keyboardDisplay = false;
                    window.clearInterval(interval);
                }
            }, 25);
        }
    }
}

//inserting a graph into the document
var insertGraphB = document.getElementById("insertGraph");
var graphs = new Array();
var graphEquations = new Array();
var graphNo = 0;//number of graphs in the doc
var curGraphNo;//the current graph being edited

//when the graph is clicked, bring up the equation div
function graphClicked(graphNo) {
    curGraphNo = graphNo;
    expressionInput.style.display = "block";
    expressionInput.value = graphEquations[graphNo];
}

expressionInput.style.display = "none";

//checks if the program is mobile. If so, don't pop up mobile keyboard
function mobileKeyboard() {
    if (window.innerWidth < 500)
        expressionInput.readOnly = 'true';
    else
        expressionInput.readOnly = 'false';
}

mobileKeyboard();

window.onresize = mobileKeyboard;