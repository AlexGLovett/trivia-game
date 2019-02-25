var maxTime = 30;
var segueTime = 0;
var counter = 0;
var questionNumber = 0;
var right = 0;
var wrong = 0;
var missed = 0;
var timer;
var questions = [
    {
        question: "Who Is This Champion?",
        answers: ["Ashe","Malzahar","Yorick","Ezrael"],
        correctAnswer: "Malzahar",
        questionImage: "assets/media/malz.gif"
    },
    {
        question: "If you are playing the Support role, which lane should you go to at the beginning of the game?",
        answers: ["Top","Middle","Bottom","Jungle"],
        correctAnswer: "Bottom",
        questionImage: "assets/media/sona.gif"
    },
    {
        question: "Who makes League of Legends?",
        answers: ["Riot Games","Mob Games","Mad Games","Meb Games"],
        correctAnswer: "Riot Games",
        questionImage: "assets/media/jinx.gif"
    },
    {
        question: "What boots would an ADC normally get?",
        answers: ["Boots of Mobility","Sorcerer's Shoes","Berserker's Greaves","Berserker's Clogs"],
        correctAnswer: "Berserker's Greaves",
        questionImage: "assets/media/draven.gif"
    },
    {
        question: "What does ADC stand for?",
        answers: ["Attack Damage Captain","Attack Damage Creator","Attack Damage Controller","Attack Damage Carry"],
        correctAnswer: "Attack Damage Carry",
        questionImage: "assets/media/newguy.gif"
    },
    {
        question: "How many characters can play in the Twisted Treeline?",
        answers: ["4","5","2","3"],
        correctAnswer: "3",
        questionImage: "assets/media/vi.gif"
    },
    {
        question: "How many characters can play in the Summoner's Rift?",
        answers: ["4","5","2","3"],
        correctAnswer: "5",
        questionImage: "assets/media/yasuo.gif"
    },
    {
        question: "Select the fake Summoner Spell.",
        answers: ["Flash","Ignite","Exhaust","Slow"],
        correctAnswer: "Slow",
        questionImage: "assets/media/udyr.gif"
    },
    {
        question: "Which Summoner Spell is traditionally selected by a Jungler?",
        answers: ["Flash","Ignite","Slow","Smite"],
        correctAnswer: "Smite",
        questionImage: "assets/media/teemo.gif"
    },
    {
        question: "The game is won by smashing your opponent's _____ _______.",
        answers: ["Base Crystal","Defense Crystal","Nexus Crystal","Shield Crystal"],
        correctAnswer: "Nexus Crystal",
        questionImage: "assets/media/kahyle.gif"
    }
];

$(document).on("click","#begin",function(){
    right = 0;
    wrong = 0;
    missed = 0;
    $("#question").children().remove();
    $("#begin").remove();
    gameStart();
});

function gameStart(){
    $('body').css("background-image",'url("assets/media/bg.jpg")');
    updateStatus();
    proceedToQuestion(questionNumber);
};

function updateStatus(){
$("#status").text("Correct: " + right + " Incorrect: " + wrong + " Missed: " + missed);
};

function proceedToQuestion(number){
    updateStatus();
    $("#media").children().remove();
    counter = maxTime;
    $("#timer").text(counter + "s Remaining");
    if(number <= 9){
        timer = setInterval(decrement,1000);
        var question = {};
        Object.assign(question,questions[number]);
        console.log(question);
        var qText =  $("<h4>").text(question.question).appendTo("#question");
        for (var i = 0; i < question.answers.length; i++) {
            var choiceButton = $('<input type="radio" name="answer-button"/>').attr("value",question.answers[i]).appendTo("#answers");
            var choice = $("<span>").text(question.answers[i]).appendTo("#answers");
            $("<br>").appendTo("#answers");
        };
        $('#media').prepend('<img id="questionImage" src="'+question.questionImage+'" />');
    }
    else{

        proceedToEnd();

    }
};

function decrement(){
    counter--;
    if (counter == 0){
        timeout();
    }
    $("#timer").text(counter + "s Remaining");
};

$(document).on("click",'input[name="answer-button"]',function(){
    evaluate(this["value"]);
});

function evaluate(answer){  
    var rightAnswer = questions[questionNumber].correctAnswer;
    if (answer == rightAnswer){
        questionNumber++;
        correct();
    }
    else{
        questionNumber++;
        incorrect();
    }
};

function timeout(){
    console.log("Times UP");
    questionNumber++;
    missed++;
    clearInterval(timer);
    updateStatus();
    $("#timer").text("");
    $("#question").children().remove();
    $("#answers").children().remove();
    $("#media").children().remove();
    $("#status").text("");
    $("<h3>").text("Times Up...").appendTo("#question");
    $('#media').prepend('<img id="questionImage" src="assets/media/timeout.gif" />');
    setTimeout(function(){
        $("#question").children().remove();
        $("#media").children().remove();
        proceedToQuestion(questionNumber);
    },3000);
};

function correct(){
    right++;
    clearInterval(timer);
    updateStatus();
    $("#timer").text("");
    $("#question").children().remove();
    $("#answers").children().remove();
    $("#media").children().remove();
    $("#status").text("");
    $("<h3>").text("Well Done!").appendTo("#question");
    $('#media').prepend('<img id="questionImage" src="assets/media/right.gif" />');
    setTimeout(function(){
        $("#question").children().remove();
        $("#media").children().remove();
        proceedToQuestion(questionNumber);
    },3000);
};

function incorrect(){
    wrong++;
    clearInterval(timer);
    updateStatus();
    $("#timer").text("");
    $("#question").children().remove();
    $("#answers").children().remove();
    $("#media").children().remove();
    $("#status").text("");
    $("<h3>").text("Aww...").appendTo("#question");
    $('#media').prepend('<img id="questionImage" src="assets/media/wrong.gif" />');
    setTimeout(function(){
        $("#question").children().remove();
        $("#media").children().remove();
        proceedToQuestion(questionNumber);
    },3000);
};

function proceedToEnd(){
    $('body').css("background-image",'url("assets/media/done.jpg")');
    questionNumber = 0;
    $("#status").text("");
    $("#timer").text("");
    var score = $("<h4>").text("You Scored " + right + "0%!").appendTo("#question");
    var tryAgain = $("<h6>").text("Try Again?").appendTo("#question");
    var tryButton = $('<button id="begin">Start</button>').appendTo("#question");
    if(right >= 5){
        $('#media').prepend('<img id="questionImage" src="assets/media/end.gif" />');
    }
    else{
        $('#media').prepend('<img id="questionImage" src="assets/media/defeat.gif" />');
    }
};