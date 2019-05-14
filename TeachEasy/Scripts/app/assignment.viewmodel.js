function AssignmentViewModel() {

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
            let answer = document.createElement('div');
            answer.appendChild(document.createElement('br'));
            answer.appendChild(document.createElement('br'));
            answer.appendChild(document.createElement('br'));

            question.appendChild(document.createElement('br')); 
            question.appendChild(answer);
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
    });

    var optionsButton = document.querySelector('#addSection');
    addButton.addEventListener('click', function () {
        addQuestion();
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