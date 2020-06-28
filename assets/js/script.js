let questionEl = document.querySelector("#question");
let confirmEl = document.querySelector(".confirm");
let startBtn = document.querySelector(".start-btn");
let choices = document.querySelector("#choices");
let title = document.querySelector(".title");
let choice1 = document.querySelector("#c1");
let choice2 = document.querySelector("#c2");
let choice3 = document.querySelector("#c3");
let choice4 = document.querySelector("#c4");
let highScoreBtn = document.querySelector(".high-score");
let pageContentEl = document.querySelector("#page-content");
let timerEl = document.querySelector("#timer");
let headerEl = document.querySelector("header");
let timeLeft = 120;
let selectedQuestion = 0;


// Array of questions and choices stored in an Array
let questions = [
    {q:"Inside which HTML element do we link JavaScript?", c1:"<javascript>", c2:"<js>", c3:"<script>", c4:"<scripting>", a:"<script>"},
    {q:"How do you call a function named 'pingPlayer'?", c1:"call pingPlayer()", c2:"pingPlayer()", c3:"call function pingPlayer", c4:"Call.pingPlayer()", a:"pingPlayer()"},
    {q:"In JavaScript, the following loop will execute ________ times. for (x=0; x<10; x++).", c1:"9", c2:"10", c3:"11", c4:"not enough information to come to a conclusion", a:"10"},
    {q:"In JavaScript, the symbols + - * and / are:", c1:"operators", c2:"expressions", c3:"comparison operators", c4:"None of the above", a:"operators"},
    {q:"When you want to use JavaScript to manipulate the browser window, the browser window's JavaScript object name is:", c1:"frame", c2:"document", c3:"window", c4:"browser_window", a:"window"},
    {q:"Alert(message), close() and reset() are JavaScript:", c1:"objects", c2:"methods", c3:"properties", c4:"commands", a:"methods"},
    {q:"When you want to use JavaScript to manipulate the HTML, the Web page's JavaScript object name is:", c1:"frame", c2:"document", c3:"window", c4:"browser_window", a:"document"},
    {q:"A named element in a JavaScript program that is used to store and retrieve data is a _____.", c1:"method", c2:"assignment operator", c3:"variable", c4:"string", a:"variable"},
    {q:"In a form, if you want users to select only one option out of many, use:", c1:"check boxes", c2:"radio buttons", c3:"text boxes", c4:"either a or b", a:"radio buttons"},
    {q:"In HTML, you use a button on a form to:", c1:"run a program", c2:"submit a form to a server", c3:"reset a form to its original state", c4:"all of the above", a:"all of the above"}
];

questions.sort(() => 0.5 - Math.random());

let startQuiz = function() {
    startBtn.classList.add("hidden");
    title.classList.add("hidden");
    choices.classList.remove("hidden");
    time = setInterval(timer, 1000);
    displayQuiz();
};

let timer = function() {
    timerEl.textContent = timeLeft;
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timer);
        gameOver();
    }
}

let displayQuiz = function() {
    gameOver();
    questionEl.textContent = questions[selectedQuestion].q;
    choice1.textContent = "1. " + questions[selectedQuestion].c1;
    choice2.textContent = "2. " + questions[selectedQuestion].c2;
    choice3.textContent = "3. " + questions[selectedQuestion].c3;
    choice4.textContent = "4. " + questions[selectedQuestion].c4;
};

let checkAnswer = function(response) {
    if (response === questions[selectedQuestion].a) {
        return true;
    } else {
        return false;
    }
};

let confirmResponse = function() {
    
    if (event.target.matches(".choice-btn")) {
        var response = event.target.textContent.slice(3);
        checkAnswer(response);
        if (checkAnswer(response) === true) {
            confirmEl.setAttribute("style", "background-color: green");
            confirmEl.textContent = "Correct!"
            setTimeout(clearConfirm, 1000 * 1.5);
        } else {
            confirmEl.setAttribute("style", "background-color: red");
            confirmEl.textContent = "Wrong.";
            setTimeout(clearConfirm, 1000 * 1.5);
        }
        selectedQuestion++;
        setTimeout(displayQuiz, 1000 * 1.5);
    }
};

let clearConfirm = function() {
    confirmEl.textContent = ""
    confirmEl.setAttribute("style", "background-color: white")
}

let displayLeaderboards = function() {
    highScoreBtn.classList.add("hidden");
    headerEl.setAttribute("style", "color: white");

}

let gameOver = function() {
    if (selectedQuestion === questions.length || timer <= 0) {
        choices.classList.add("hidden");
        clearInterval(timer);
        displayLeaderboards();
    }
}

startBtn.addEventListener("click", startQuiz);

pageContentEl.addEventListener("click", confirmResponse);

highScoreBtn.addEventListener("click", displayLeaderboards);