//this file is for adding elements such as questions or answers to the assignment
//ADD SECTION ICON///////////////////////////////////////////
//create the variables
var addSecImg = document.createElement("img");
var addSecHighlight = document.createElement("span");
var addSecSelected;//if the add-section icon is selected
var addSecEnabled;//if the add-section icon is enabled

//give the variables their values
addSecImg.src = "../images/addSec.png";
addSecHighlight.style.backgroundColor = "#6a6a6a";
addSecHighlight.style.opacity = "0.5";
addSecHighlight.style.filter = "alpha(opacity=50)";

//size the variables
addSecImg.style.width = "60px";
addSecImg.style.height = "60px";
addSecHighlight.style.width = "52px";
addSecHighlight.style.height = "41px";

var addSecX = window.innerWidth / 2 - addSecImg.width / 2, addSecY = 300;

//locate variables
addSecImg.style.position = "absolute";
addSecHighlight.style.position = "absolute";
addSecImg.style.left = addSecX + "px";
addSecImg.style.top = addSecY + "px";
addSecHighlight.style.left = "-200px";
addSecHighlight.style.top = "-200px";

document.body.appendChild(addSecImg);
document.body.appendChild(addSecHighlight);

function moveAddSecIcon(y) {
    addSecY += y;
    addSecImg.style.top = addSecY + "px";
}

function secIconHovered() {
    addSecHighlight.style.left = 4 + addSecX + "px";
    addSecHighlight.style.top = 15 + addSecY + "px";
    addSecSelected = true;
}

function secIconUnhovered() {
    addSecHighlight.style.left = "-200px";
    addSecHighlight.style.top = "-200px";
    addSecSelected = false;
}

//enables addSecIcon if val is true
function enableAddSecIcon(val) {
    if (val == true || val == false) {//val must be boolean
        addSecEnabled = val;
        if (!val)
            addSecImg.style.display = "none";
        else
            addSecImg.style.display = "block";
    } else console.log("Error: the argument to enableAddSecIcon() must be boolean");
}
enableAddSecIcon(false);

//this function fades in the specified element
function fadeInElement(el, speed) {
    el.style.opacity = "0.0";
    el.style.filter = "alpha(opacity=0)";
    let op = 0;//opacity

    let interval = window.setInterval(function () {
        op += 5;
        el.style.opacity = op / 100 + "";
        el.style.filter = "alpha(opacity=" + op + ")";
        if (op == 100) window.clearInterval(interval);
    }, speed);
}

//check if the user is hovering over the add section icon
window.addEventListener('mousemove', function (event) {
    let x = event.clientX;
    let y = event.clientY;

    if (x >= addSecX && x <= (addSecX + addSecImg.width)
        && y >= addSecY && y <= (addSecY + addSecImg.height) && addSecEnabled)
        secIconHovered();
    else
        secIconUnhovered();
});

//check if the user clicks on the add section icon
window.addEventListener('click', function (event) {
    let x = event.clientX;
    let y = event.clientY;

    //if the add section icon isn't hovered over, the user may be in mobile so check if they tapped it
    if ((addSecSelected || (x >= addSecX && x <= (addSecX + addSecImg.width)
        && y >= addSecY && y <= (addSecY + addSecImg.height))) && addSecEnabled)
        addSecIconPressed();
});

//CHOOSE QUESTION TYPE ICON//////////////////////////////////
var written = document.getElementById("written");
var mc = document.getElementById("mc");
var fib = document.getElementById("fib");
var tf = document.getElementById("tf");

var questionType;
var questionTypeTable = document.getElementById("reqQuestionType");
var questionTypeX = window.innerWidth / 100 * 30;
var questionTypeY = 100;
questionTypeTable.style.top = questionTypeY + "px";
questionTypeTable.style.right = questionTypeX + "px";

function moveQuestionTypeTable(y) {
    questionTypeY += y;
    questionTypeTable.style.top = questionTypeY + "px";
}

function questionTypeSelected(num) {
    questionType = num;
    moveQuestionTypeTable(300);
    questionTypeTable.style.display = "none";
    enableAddSecIcon(true);
    fadeInElement(addSecImg, 30);
    addQuestion();
}

function addSecIconPressed() {
    moveAddSecIcon(300);
    secIconUnhovered();//deselect the icon
    enableAddSecIcon(false);
    questionTypeTable.style.display = "block";
    fadeInElement(questionTypeTable, 30);
}

written.onclick = function () { questionTypeSelected(0); }
mc.onclick = function () { questionTypeSelected(1); }
fib.onclick = function () { questionTypeSelected(2); }
tf.onclick = function () { questionTypeSelected(3); }

//this div holds all questions
var questionsListDiv = document.getElementById("questionsList");
var questionsArray = [
    "Write a paragraph to describe yourself.",
    "This answer is NOT an example of an animal: a. Alligator b. Giraffe c. Lion d. Rose",
    "A ______ creates honey",
    "Santa is real: true false"
];
var questionDivs = new Array();//array holding all individual question divs
var questionsNum;//number of question divs

function addQuestion() {
    let question = document.createElement("div");
    question.innerHTML = questionsArray[questionType];
    questionDivs[questionsNum++] = question;
    questionsListDiv.appendChild(questionDivs[questionsNum - 1]);
}

//relocate elements on window resize
window.onresize = function () {
    addSecX = window.innerWidth / 2 - addSecImg.width / 2;
    addSecImg.style.left = addSecX + "px";

    questionTypeX = window.innerWidth / 100 * 30;
    questionTypeTable.style.right = questionTypeX + "px";
}

var graphInfo = document.getElementById("graphInfo");
function insertGraph() {
    graphInfo.style.display = "block";
    fadeInElement(graphInfo, 30);
}