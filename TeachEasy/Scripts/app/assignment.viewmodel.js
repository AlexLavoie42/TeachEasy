function AssignmentViewModel() {

    var written = document.getElementById("written");
    var mc = document.getElementById("mc");
    var fib = document.getElementById("fib");
    var tf = document.getElementById("tf");

    var questionType;
    var questionTypeTable = document.getElementById("reqQuestionType");
    var questionTypeX = window.innerWidth / 100 * 30;
    var questionTypeY = 100;

    var questionsListDiv = document.getElementById("asgn-page-content");
    var quill = new Quill('#asgn-page-content', {
        modules: {
            toolbar: '#toolbar'
        }
    });

    var questionsArray = [
        "Write a paragraph to describe yourself.",
        "This answer is NOT an example of an animal:",
        "A ______ creates honey",
        "Santa is real:"
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

    class GraphBlot extends BlockEmbed {
        static create() {
            graphs[graphNo] = document.createElement("div");
            graphs[graphNo].id = 'plot' + graphNo;
            graphEquations[graphNo] = "x";
            expressionInput.value = "x";
            return graphs[graphNo];
        }
    }
    GraphBlot.blotName = 'graph';
    GraphBlot.tagName = 'div';

    Quill.register(GraphBlot)

    class QuestionBlot extends BlockEmbed {
        static create() {
            let question = document.createElement('div');
            questionDivs[questionsNum++] = question;
            question.className = 'question';

            quill.insertText(questionsNum, questionsNum + "." + questionsArray[questionType]);
            let answer = document.createElement('div');

            switch (questionType) {
                case 0:
                    answer.innerHTML = "<br /><br /><br />";
                    break;
                case 1:
                    answer.innerHTML = "a. Alligator<br />b. Giraffe<br />c. Lion<br />d. Rose<br /><br />";
                    break;
                case 3:
                    answer.innerHTML = "true\t\tfalse<br /><br />";
                    break;
                default:
                    answer.innerHTML = "<br /><br />";
                    break;
            }

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
    var questionTypeDisplayed = false;//if the question type table is being displayed
    addButton.addEventListener('click', function () {
        if (!questionTypeDisplayed) {
            questionTypeTable.style.display = 'block';
            fadeInElement(questionTypeTable, 10);
            questionTypeDisplayed = true;
        } else {
            questionTypeTable.style.display = 'none';
            questionTypeDisplayed = false;
        }
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

        graphClicked(graphNo);//run the graphClicked() once automatically

        //Insert the graph into the text editor
        let range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'graph', true, Quill.sources.USER);

        draw(graphNo);

        graphs[graphNo].addEventListener('click', function (e) {
            let id = parseInt(this.id.substring(4, this.id.length));
            graphClicked(id);

            //move the equation input here
            console.log(this.offsetTop);
            document.getElementById("graphInfo").style.display = "block";
            document.getElementById("graphInfo").style.top = this.offsetTop - 1080 + "px";
        }, false);

        graphNo++;

        //send the equation editor to the last graph
        document.getElementById("graphInfo").style.display = "block";
        document.getElementById("graphInfo").style.top = graphs[graphs.length - 1].offsetTop - 1080 + "px";

        expressionInput.focus();
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

    //when the insert graph button is clicked, a graph is inserted
    insertGraphB.onclick = function () {
        insertGraph();
    };

    window.onresize = function () {
        questionTypeX = window.innerWidth / 100 * 30;
        questionTypeTable.style.right = questionTypeX + "px";
    }

    written.onclick = function () { questionTypeSelected(0); addQuestion(); questionTypeDisplayed = false; }
    mc.onclick = function () { questionTypeSelected(1); addQuestion(); questionTypeDisplayed = false; }
    fib.onclick = function () { questionTypeSelected(2); addQuestion(); questionTypeDisplayed = false; }
    tf.onclick = function () { questionTypeSelected(3); addQuestion(); questionTypeDisplayed = false; }
}

assignmentViewModel = new AssignmentViewModel();