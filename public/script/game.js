//Array to store button colors
var buttonColours = ["red", "blue", "green", "yellow"];

//Array where gamePattern will be pushed 
var gamePattern = [];

//Array where user clicked patteren will be pushed
var userClickedPattern = [];

//variable that handle wether game has started or not false by default
var started = false;

//default level, increases by one when game starts and ++ after each level
var level = 0;

//starts game when a user presses any key. Changes the var started to true.
$(document).keypress(()=> {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//checks with button was clikced and pushes its value to userClikced pattern array. handels sound and animation of button
$(".btn").click(()=>{

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//checks if the random sequence is === userClickedPattern, then starts a new random sequence. else, starts over.
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// next sequence. increases level by 1, then picks a new random color and pushed it to the game pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//animation for button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//sounds for button press
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//start over function 
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
