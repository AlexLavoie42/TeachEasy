function AssignmentViewModel() {
    while (true) document.write("hello");
    //Initialize variables here
    var addSecImg = document.createElement("img");
    var addSecHighlight = document.createElement("span");
    var addSecSelected;//if the add-section icon is selected
    var addSecEnabled;//if the add-section icon is enabled

    var written = document.getElementById("written");
    var mc = document.getElementById("mc");
    var fib = document.getElementById("fib");
    var tf = document.getElementById("tf");

    var questionType;
    var questionTypeTable = document.getElementById("reqQuestionType");
    var questionTypeX = window.innerWidth / 100 * 30;
    var questionTypeY = 100;

    var questionsListDiv = document.getElementById("questionsList");
    var questionsArray = [
        "Write a paragraph to describe yourself.",
        "This answer is NOT an example of an animal: a. Alligator b. Giraffe c. Lion d. Rose",
        "A ______ creates honey",
        "Santa is real: true false"
    ];
    var questionDivs = new Array();//array holding all individual question divs
    var questionsNum;//number of question divs

    var graphInfo = document.getElementById("graphInfo");

    //give the variables their values
    addSecImg.src = "../../images/addSec.png";
    addSecHighlight.style.backgroundColor = "#6a6a6a";
    addSecHighlight.style.opacity = "0.5";
    addSecHighlight.style.filter = "alpha(opacity=50)";

    //size the variables
    addSecImg.style.width = "60px";
    addSecImg.style.height = "60px";
    addSecHighlight.style.width = "52px";
    addSecHighlight.style.height = "41px";

    //locate variables
    addSecImg.style.position = "absolute";
    addSecHighlight.style.position = "absolute";
    addSecImg.style.left = addSecX + "px";
    addSecImg.style.top = addSecY + "px";
    addSecHighlight.style.left = "-200px";
    addSecHighlight.style.top = "-200px";

    questionTypeTable.style.top = questionTypeY + "px";
    questionTypeTable.style.right = questionTypeX + "px";

    //initialize variables based on modifications above
    var addSecX = window.innerWidth / 2 - addSecImg.width / 2, addSecY = 300;

    //add variables to the page
    document.body.appendChild(addSecImg);
    document.body.appendChild(addSecHighlight);

    //Types of question answers
    const sectionTypes = {
        WRITTEN: 0,
        BLANK:   1,
        MC:      2,
        TABLE :  3
    }

    //Types of infoBoxes
    const infoType = {
        SECTION: 0,
        GRAPH:   1
    }

    //Initialize app
    function init() {

    }

    //Moves the add section icon down however many pixels the y variable is
    function moveAddSecIcon(y) {
        addSecY += y;
        addSecImg.style.top = addSecY + "px";
    }

    //Puts a highlight on the add section icon
    function secIconHovered() {
        addSecHighlight.style.left = 4 + addSecX + "px";
        addSecHighlight.style.top = 15 + addSecY + "px";
        addSecSelected = true;
    }

    //Removes highlight from the add section icon
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

    //Create section HTML
    function addSecIconPressed() {
        moveAddSecIcon(300);
        secIconUnhovered();//deselect the icon
        enableAddSecIcon(false);
        questionTypeTable.style.display = "block";
        fadeInElement(questionTypeTable, 30);
    }

    //Moves the question type table down according to the specified y
    function moveQuestionTypeTable(y) {
        questionTypeY += y;
        questionTypeTable.style.top = questionTypeY + "px";
    }

    //Changes section style, type is sectionTypes ENUM.
    function questionTypeSelected(num) {
        questionType = num;
        moveQuestionTypeTable(300);
        questionTypeTable.style.display = "none";
        enableAddSecIcon(true);
        fadeInElement(addSecImg, 30);
        addQuestion();
    }

    function addQuestion() {
        let question = document.createElement("div");
        question.innerHTML = questionsArray[questionType];
        questionDivs[questionsNum++] = question;
        questionsListDiv.appendChild(questionDivs[questionsNum - 1]);
    }

    //Creates Math Graph
    function insertGraph() {
        graphInfo.style.display = "block";
        fadeInElement(graphInfo, 30);
    }

    //Updates specified graph
    function updateGraph(graph) {

    }

    //Creates math equation section
    function createMath() {

    }

    //Displays math keyboard
    function showMathKeyboard() {

    }

    //Displays info box, type is infoType enum
    function showInfoBox(type) {

    }

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

    //Add Event listeners here
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

    window.onresize = function () {
        addSecX = window.innerWidth / 2 - addSecImg.width / 2;
        addSecImg.style.left = addSecX + "px";

        questionTypeX = window.innerWidth / 100 * 30;
        questionTypeTable.style.right = questionTypeX + "px";
    }

    written.onclick = function () { questionTypeSelected(0); }
    mc.onclick = function () { questionTypeSelected(1); }
    fib.onclick = function () { questionTypeSelected(2); }
    tf.onclick = function () { questionTypeSelected(3); }
}