var maxTime = 30;
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
        correctAnswer: "Malzahar"
    },
    {
        question: "If you are playing the Support role, which lane should you go to at the beginning of the game?",
        answers: ["Top","Middle","Bottom","Jungle"],
        correctAnswer: "Bottom"
    },
    {
        question: "Who makes League of Legends?",
        answers: ["Riot Games","Mob Games","Mad Games","Meb Games"],
        correctAnswer: "Riot Games"
    },
    {
        question: "What boots would an ADC normally get?",
        answers: ["Boots of Mobility","Sorcerer's Shoes","Berserker's Sabatons","Berserker's Clogs"],
        correctAnswer: "Berserker's Sabatons"
    },
    {
        question: "What does ADC stand for?",
        answers: ["Attack Damage Captain","Attack Damage Creator","Attack Damage Controller","Attack Damage Carry"],
        correctAnswer: "Attack Damage Carry"
    },
    {
        question: "How many characters can play in the Twisted Treeline?",
        answers: ["4","5","2","3"],
        correctAnswer: "3"
    },
    {
        question: "How many characters can play in the Summoner's Rift?",
        answers: ["4","5","2","3"],
        correctAnswer: "5"
    },
    {
        question: "Select the fake Summoner Spell.",
        answers: ["Flash","Ignite","Exhaust","Slow"],
        correctAnswer: "Slow"
    },
    {
        question: "Which Summoner Spell is traditionally selected by a Jungler?",
        answers: ["Flash","Ignite","Slow","Smite"],
        correctAnswer: "Smite"
    },
    {
        question: "The game is won by smashing your opponent's _____ _______.",
        answers: ["base crystal","defense crystal","nexus crystal","shield crystal"],
        correctAnswer: "nexus crystal"
    }
];

$(document).on("click","#begin",function(){
    $("#begin").remove();
    gameStart();
});

function gameStart(){
    updateStatus();
    proceedToQuestion(questionNumber);
};

function updateStatus(){
$("#status").text("Correct: " + right + " Incorrect: " + wrong + " Missed: " + missed);
};

function proceedToQuestion(number){
    counter = maxTime;
    $("#timer").text(counter + "s Remaining");
    if(number <= 9){
        timer = setInterval(decrement,1000);
        questionNumber++;
        var question = {};
        Object.assign(question,questions[number]);
        console.log(question);
        var qText =  $("<h4>").text(question.question).appendTo("#question");
        for (var i = 0; i < question.answers.length; i++) {
            var choiceButton = $('<input type="radio" name="answer-button"/>').attr("value",question.answers[i]).appendTo("#answers");
            var choice = $("<span>").text(question.answers[i]).appendTo("#answers");
            $("<br>").appendTo("#answers");
        };
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

function timeout(){
    console.log("Times UP");
    missed++;
    clearInterval(timer);
    updateStatus();
    $("#question").children().remove();
    $("#answers").children().remove();
    proceedToQuestion(questionNumber);
};

function correct(){

};

function incorrect(){

};

function proceedToEnd(){

};