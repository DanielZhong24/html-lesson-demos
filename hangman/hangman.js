var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 3;

function blankCanvas(){
    ctx.clearRect(0,0,200,150);
}

function gallows(){
    ctx.moveTo(30,0);
    ctx.lineTo(100,0);
    ctx.moveTo(100,0);
    ctx.lineTo(100,14);
    ctx.moveTo(30,0);
    ctx.lineTo(30,100);
    ctx.moveTo(5,100);
    ctx.lineTo(55,100)
    ctx.stroke();
}

function head(){
    ctx.beginPath();
    ctx.arc(100,25,12,0,2*Math.PI);
    ctx.stroke();
}

function body(){
    ctx.moveTo(100,35);
    ctx.lineTo(100,70);
    ctx.stroke();
}

function leftArm(){
    ctx.moveTo(100,55);
    ctx.lineTo(75,40);
    ctx.stroke();
}
function leftHand(){
    ctx.moveTo(75,40);
    ctx.lineTo(75,30);
    ctx.stroke();
}
function rightArm(){
    ctx.moveTo(100,55);
    ctx.lineTo(125,40);
    ctx.stroke()
}
function rightHand(){
    ctx.moveTo(125,40);
    ctx.lineTo(125,30);
    ctx.stroke();
}
function leftLeg(){
    ctx.moveTo(100,70);
    ctx.lineTo(75,85);
    ctx.stroke();

}
function leftFoot(){
    ctx.moveTo(75,85);
    ctx.lineTo(65,85);
    ctx.stroke();
}
function rightLeg(){
    ctx.moveTo(100,70);
    ctx.lineTo(125,85);
    ctx.stroke();
}
function rightFoot(){
    ctx.moveTo(125,85);
    ctx.lineTo(135,85);
    ctx.stroke();    
}

function letterBlanks(x,y){
    ctx.moveTo(x,130);
    ctx.lineTo(y,130);
    ctx.stroke();
}

function fillLeters(letter,x){
    ctx.font = "20px Comic sans";
    ctx.fillText(letter,x,125)
}

var levelOne= ["vex", "aver", "zeal", "infer"];
var levelTwo = [ "banal", "depict", "eulogy", "dearth", "imply", "fawn"];
var levelThree= ["guile", "mitigate", "extant", "catalyst", "lucid", "dogged", "cadge", "abscond"];
var levelFour= ["caprice", "diffident","esoteric", "depredation", "barefaced", "antipathy", "tractable", "ephemeral", "corporal", "enigma"];
var levelFive=["amalgamate", "conflagration", "iconoclast", "improvidence","pulchritudinous", "nefarious", "sagacious", "antediluvian", "gossamer","audacious", "ponderous", "ineffable"];

var index = prompt("Welcome to HangMan! Choose level(1-5)");
var levels = [levelOne,levelTwo,levelThree,levelFour,levelFive];
var wordChoices = levels[index-1];
var gameword = wordChoices[Math.floor(Math.random()*wordChoices.length)];


function startGame(){
    var playerConfirmation = confirm("Do you want to play?");
    if(playerConfirmation == true){
        document.getElementById("idResult").innerHTML = "Pick a level to start with!";
        gallows();
        createLetterBlanks();
    }else{
        document.getElementById('idResult').innerHTML = "Ok, maybe next time";
    }

}

function showGameWord(){
    document.getElementById('ShowGameword').innerHTML = gameword;
}

function createLetterBlanks(){
    var lettersLength = gameword.length * 15;
    for(i = 5; i < lettersLength; i+= 15){
        letterBlanks(i,i+10);
    }
}

function fillLeterBlanks(count){
    var xValue = count* 15 +5;
    var letterValue = gameword[count];
    fillLeters(letterValue,xValue)
}

function fillInWholeWord(){
    for(i = 0; i < gameword.length; i++){
        fillLeterBlanks(i);
    }
}

function guessWord(){
    var guess = prompt("What is your guess for the word?");
    if(guess === gameword){
        document.getElementById('idResult').innerHTML = "That's correct";
        gameOver("won")
    }else{
        document.getElementById('idResult').innerHTML = "That's not it, keep guessing";
        addBodyPart();
    }
}

//guessing individual letters
var length = gameword.length;
var wrongGuesses = [];
var correctGuesses = [];
var numberOfMissesdGuesses = -1;
var hangmanArray=[head,body,leftArm,leftHand,rightArm,rightHand,leftLeg,leftFoot,rightLeg,rightFoot];
var guessedWordCount = 0;



function guessLetter(){
    var guess = prompt("Guess a letter!");
    guess = guess.toLowerCase();
    if(wrongGuesses.includes(guess) || correctGuesses.includes(guess)){
        document.getElementById('idResult').innerHTML = "You've already guessed the same letter";
        return;
    }

    if(guess.length > 1){
        document.getElementById('idResult').innerHTML = "You can only guess one letter at a time";
        return;
    }
    var letters = [];
    for(i = 0; i < length; i++){
        if(guess === gameword[i]){
            letters.push(i);
        }
    }

    if(letters[0] != null){
        document.getElementById("idResult").innerHTML = "That's correct";
        var lettersLength = letters.length;
        for(j = 0; j < lettersLength; j++){
            fillLeterBlanks(letters[j]);
            guessedWordCount++;
        }
        correctGuesses.push(guess);
        if (guessedWordCount == gameword.length){
            gameOver("won");
        }
    } else{
        document.getElementById('idResult').innerHTML = "That's not a correct letter";
        wrongGuesses.push(guess);
        document.getElementById('ArrayOfWrongGuesses').innerHTML = wrongGuesses;
        addBodyPart();
    }
}

function addBodyPart(){
    numberOfMissesdGuesses++;
    if(numberOfMissesdGuesses === hangmanArray.length){
        gameOver("lost");
    }
    var bodyPart = hangmanArray[numberOfMissesdGuesses]
    bodyPart();
}

function gameOver(status){
    fillInWholeWord();
    var ending = "You " + status + "! Do you want to play again?"
    var playAgain = confirm(ending);
    if(playAgain === true){
        location.reload();
    }else{
        blankCanvas();
        document.getElementById("idResult").innerHTML = ("Okay. See you next time.")
    } 
}

startGame();