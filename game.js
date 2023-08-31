var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow" ];
var first_keypress=true;
var level=0;
var user_index=0;


$(document).on("keypress" , function(event){
if(first_keypress==true && level==0){
    $("#level-title").text("Level "+level);
    nextSequence();
}
first_keypress=false;
});

$(".btn").on("click", function(){
    if(first_keypress==false){
        var clickedButton = $(this);
        var userChosenColour = clickedButton.attr("id");
        userClickedPattern.push(userChosenColour);
        user_index++;
        console.log("user index "+user_index);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        if(level==user_index){
            checkAnswer(level);
            setTimeout(function(){
                if(first_keypress==false) {
                    userClickedPattern.splice(0, userClickedPattern.length);
                    user_index=0;
                    nextSequence();
                    
                }}, 1000);
        }
        
        
}});



//****************************************************************************** */

function nextSequence(){ 
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4 );
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
 //$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    console.log(gamePattern);
    console.log(userClickedPattern);
   
}

function startOver(){
gamePattern=[];
userClickedPattern=[];
first_keypress=true;
level=0;
user_index=0;

}
function checkAnswer(currentLevel){
    for(var i=0; i<currentLevel;i++){
        if(gamePattern[i]==userClickedPattern[i]){
         console.log("Success gamepatter: "+gamePattern[i]+" user patter: "+userClickedPattern[i]);
        }
        else{
            console.log("wrong answer" +gamePattern[i]+" user patter: "+userClickedPattern[i]);
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
               }
        }
    }





function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },150);}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


