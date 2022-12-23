//alert("hi")
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern=[];

var started =false;

var level=0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour)
  var op = "sounds/"+userChosenColour+".mp3";
  var resp = new Audio(op);
  resp.play();
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length - 1)

})

function nextSequence(){
  userClickedPattern = [];

 level++;
 $("#level-title").text("Level " + level);
  var r = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[r];
  gamePattern.push(randomChosenColour);  
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
    var op = "sounds/"+randomChosenColour+".mp3";
    var resp = new Audio(op);
    resp.play();
  
}

function animatePress(currentColour){
$("."+currentColour).addClass("pressed")
setTimeout(function(){
  $("."+currentColour).removeClass("pressed");
}, 100);

}

function wrong(currentColour){
  $("."+currentColour).addClass("game-over")
  setTimeout(function(){
    $("."+currentColour).removeClass("game-over");
  }, 200);
}

function checkAnswer(currentLevel){

if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}
else{
  console.log("failure");
  wrong(userClickedPattern[currentLevel]);
  var op = "sounds/wrong.mp3";
  var resp = new Audio(op);
  resp.play();

  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

function startOver(){
  started =0; 
  level= 0;
  gamePattern = [];
}