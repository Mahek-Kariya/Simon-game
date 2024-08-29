var userClickedPattern=[];
var gamepattern = [];
var level = 0;
var started = false;
var buttonColours = ["red","blue","green","yellow"];
$(document).keydown(function(){
    //console.log(event.key);
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
}); 


$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});



function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
   setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
   },100);
}

function checkAnswer(currentLevel){
    if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("Wrong");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game is over! Press any key to retsart");
        startOver();
    }
}
function startOver(){
    level = 0;
    started = false;
    gamepattern=[];
}
