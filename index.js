


// add seq
function newNumber(arr,startFlag) {
    // Generate a random number between 1 and 4
    const randomNumber = Math.floor(Math.random() * 4) + 1;

    // Add the random number to the array
    

    arr.push(randomNumber);
    //$("h1").text("Score: " + (arr.length-1))
    console.log("correctSeq: "+correctSeq)
}

// Example usage:
const correctSeq = [];
let trySeq = [];
const animationTime = 1000;

function CompSeqs(correctSeq, trySeq) {
    // Check if the arrays have the same length
   
  
    // Iterate through the arrays and compare their elements
    for (let i = 0; i < trySeq.length; i++) {
      if (correctSeq[i] !== trySeq[i]) {
        return "Player lost."; // Elements at position i are not equal
      }
    }
    if (trySeq.length < correctSeq.length) {
        return "Add input to trySeq.";
    }
     
    return "Null msg."; // All elements are equal
  }

///////////////////////////

////////////////Start///////////////////////
startFlag = 0;
$(document).keydown(function (event) {
    // Check which key was pressed
    const keyPressed = event.key;
    
    if (startFlag==0){
        NewCorrectSeq(correctSeq)
    }
    startFlag = 1;
    
});
function NewCorrectSeq(correctSeq){
    newNumber(correctSeq);
    const startColor = correctSeq[correctSeq.length-1];
    if (startColor==1){
        btnAnimationBlink("green")
    }else if (startColor==2){
        btnAnimationBlink("red")
    }else if (startColor==3){
        btnAnimationBlink("yellow")
    }else if (startColor==4){
        btnAnimationBlink("blue")
    }
}
function btnAnimationBlink(btnColor) {
    var audio = document.getElementById(btnColor+"Audio");
    audio.play();
    $("#"+btnColor).fadeOut(function () {
        $("#"+btnColor).fadeIn();
    });
}
function btnAnimationClick(btnColor,callback) {
    var audio = document.getElementById(btnColor+"Audio");
    audio.play();
    $("#"+btnColor).removeClass(btnColor);
    $("#"+btnColor).addClass("pressed");
    $("#"+btnColor).fadeOut(function () {
        $("#"+btnColor).removeClass("pressed");
        $("#"+btnColor).addClass(btnColor);
        $("#"+btnColor).fadeIn(function(){
            

        });
    });

    setTimeout(function() {
        // Call the callback function to signal that the animation is done
        callback();
    }, animationTime);
}
// Presses buttons
$(document).ready(function () {
    // Define an array of button IDs
    const buttonIds = ["yellow", "red", "blue", "green"];

    

    // Attach a click event handler to all buttons with the specified IDs
    buttonIds.forEach(function (id) {
        $("#" + id).click(function () {
            if (startFlag==1){
                

                btnAnimationClick(id,function(){
                    
                    if (id=="yellow"){
                        trySeq.push(3);
                    } else if(id=="red"){
                        trySeq.push(2);
                    } else if(id=="green"){
                        trySeq.push(1);
                    } else if(id=="blue"){
                        trySeq.push(4);
                    }
                    console.log("Tryseq: " + trySeq);

                    msg = CompSeqs(correctSeq, trySeq);
                    console.log(msg)    
                    if (msg == "Player lost."){
                        $("h1").text("You lost the match!")
                        var audioW = document.getElementById("wrongAudio");
                        audioW.play();
                        $("body").addClass("game-over")
                        setTimeout(function() {
                            $("body").removeClass("game-over");
                        }, 500);

                    } else if (msg == "Null msg."){

                        if (trySeq.length==correctSeq.length){
                            trySeq = [];
                            console.log("Tryseq Erased!");
                            NewCorrectSeq(correctSeq)
                        }
                        $("h1").text("Score: " + (correctSeq.length-1))
                        
                    }

                });
                
                
        
            }
        });
    });
});


