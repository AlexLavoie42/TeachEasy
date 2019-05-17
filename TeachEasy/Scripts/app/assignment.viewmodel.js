function AssignmentViewModel() {

    //Initialize variables here
    /*
    var addSecImg = document.createElement("img");
    var addSecHighlight = document.createElement("span");
    var addSecSelected;//if the add-section icon is selected
    var addSecEnabled;//if the add-section icon is enabled
    */
    var written = document.getElementById("written");
    var mc = document.getElementById("mc");
    var fib = document.getElementById("fib");
    var tf = document.getElementById("tf");

    var questionType;
    var questionTypeTable = document.getElementById("reqQuestionType");
    var questionTypeX = window.innerWidth / 100 * 30;
    var questionTypeY = 100;

    var questionsListDiv = document.getElementById("questionsList");
    var quill = new Quill('#questionsList', {
        modules: {
            toolbar: '#toolbar'
        }
    });

    var questionsArray = [
        "Write a paragraph to describe yourself.",
        "This answer is NOT an example of an animal: a. Alligator b. Giraffe c. Lion d. Rose",
        "A ______ creates honey",
        "Santa is real: true false"
    ];
    var questionDivs = new Array();//array holding all individual question divs
    var questionsNum;//number of question divs

    var graphInfo = document.getElementById("graphInfo");
    /*
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

    //initialize variables based on modifications above
    var addSecX = window.innerWidth / 2 - addSecImg.width / 2, addSecY = 300;

    //locate variables
    addSecImg.style.position = "absolute";
    addSecHighlight.style.position = "absolute";
    addSecImg.style.left = addSecX + "px";
    addSecImg.style.top = addSecY + "px";
    addSecHighlight.style.left = "-200px";
    addSecHighlight.style.top = "-200px";

    questionTypeTable.style.position = "absolute";
    questionTypeTable.style.top = questionTypeY + "px";
    questionTypeTable.style.right = questionTypeX + "px";

    //add variables to the page
    document.body.appendChild(addSecImg);
    document.body.appendChild(addSecHighlight);*/

    //Initialize math equations
    let BlockEmbed = Quill.import('blots/block/embed');

    class MathBlot extends BlockEmbed {
        static create() {
            let node = super.create();
            node.textContent += "x";
            MathLive.makeMathField(node);
            return node;
        }
    }
    MathBlot.blotName = 'math';
    MathBlot.tagName = 'span';

    Quill.register(MathBlot);

    class QuestionBlot extends BlockEmbed {
        static create() {
            let question = document.createElement('div');
            questionDivs[questionsNum++] = question;
            question.className = 'question';

            quill.insertText(questionsNum, questionsArray[questionType]);
            question.appendChild(document.createElement('br'));
            question.appendChild(document.createElement('br'));

            let answer = document.createElement('div');
            answer.className = 'answer';
            answer.innerHTML = "Answer: ";

            question.appendChild(answer);
            question.appendChild(document.createElement('br'));

            return question;
        }
    }
    QuestionBlot.blotName = 'question';
    QuestionBlot.tagName = 'div';

    Quill.register(QuestionBlot);

    var mathButton = document.querySelector('#math');
    mathButton.addEventListener('click', function () {
        let range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'math', true, Quill.sources.USER);
    });

    var addButton = document.querySelector('#addSection');
    addButton.addEventListener('click', function () {
        addQuestion();
        $('#questionsList p + div').prev('p').attr('class', 'q');
    });

    var saveQuestionsListButton = document.querySelector('#saveQuestionsList');
    saveQuestionsListButton.addEventListener('click', function () {
        saveQuestionsList();
    });

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

    //Moves the question type table down according to the specified y
    function moveQuestionTypeTable(y) {
        questionTypeY = y;
        questionTypeTable.style.top = questionTypeY + "px";
    }

    //Changes section style, type is sectionTypes ENUM.
    function questionTypeSelected(num) {
        questionType = num;
        questionTypeTable.style.display = "none";
    }

    function addQuestion() {
        quill.insertEmbed(questionsNum + 1, 'question', true, Quill.sources.USER);
    }

    function saveQuestionsList() {
        $form = $('#questionListForm');
        $('#Answer').val($("#questionsList").text());
        $('#QuestionText').val($("#questionsList").text());
        $form.submit();
        /*
        $.ajax({
            url: "/Questions/Create",
            data: {
                //QuestionText: $("#questionsList").val(),
                //Answer: $("#questionsList").val(),
                QuestionText: $("#questionsList").val(),
                Answer: $("#questionsList").val(),
                IsPublic: false,
                SubjectId: ""
            },
            method: "POST",
            dataType: "html",

            success: function (result) {
                console.log(result);
            }
        });
        */
    }

    //Creates Math Graph
    function insertGraph() {
        graphInfo.style.display = "block";
        fadeInElement(graphInfo, 30);
    }

    //Updates specified graph
    function updateGraph(graph) {

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
    //check if the user is hovering over a question
    window.addEventListener('mousemove', function (event) {
        let x = event.clientX;
        let y = event.clientY;

        //add logic here
    });

    window.onresize = function () {
        questionTypeX = window.innerWidth / 100 * 30;
        questionTypeTable.style.right = questionTypeX + "px";
    }

    written.onclick = function () { questionTypeSelected(0); }
    mc.onclick = function () { questionTypeSelected(1); }
    fib.onclick = function () { questionTypeSelected(2); }
    tf.onclick = function () { questionTypeSelected(3); }
}

assignmentViewModel = new AssignmentViewModel();