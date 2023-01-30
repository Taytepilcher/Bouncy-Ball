
/*

TODO: 
    1. Make object of ball, with x, y, size, rgb, name etc
    2. add more ball objects, and add collision with those
    3. allow balls to spawn at cursor

*/



let canvasWidth = 900
let canvasHeight = 900


var ballSize = 200;
var ballRadius = ballSize/2;
var ballCoordX = canvasWidth/2;
var ballCoordY = canvasHeight/2;

 
//needed for bouncing
var gravity = 0.3;
var elasticity = -0.9;
var ballVelocityY = 5;
var ballVelocityX = 10;


function updateBall(){

      //find edges
      var bottomOfBall = (ballCoordY + (ballSize/2));
      var leftSideOfBall = (ballCoordX - (ballSize/2));
      var rightSideOfBall = (ballCoordX + (ballSize/2));
      var topOfBall = (ballCoordY - (ballSize/2));


      //apply gravity to y velocity of ball (always falling)
      ballVelocityY += gravity;

      //update coordinates by the velocity, the velocity is
      //how much it moves each frame
      ballCoordY += ballVelocityY;
      ballCoordX += ballVelocityX;

      //if we have a collision on the right side of the ball
      if(rightSideOfBall > canvasWidth){
        ballCoordX = canvasWidth - ballRadius;  //the centre of the ball is a radius distance away from the edge of the screen
        ballVelocityX *= elasticity;            //it has collided so it needs to lose some speed
      }else if(leftSideOfBall < 0){             //same again but if it hits the left side
        ballCoordX = ballRadius;                
        ballVelocityX *= elasticity;
      }

      //if we have a collision at the bottom of the ball
      if(bottomOfBall > canvasHeight){         //do the same as with the x axis
        ballCoordY = canvasHeight - ballRadius;
        ballVelocityY *= elasticity; 
      }else if(topOfBall < 0){                //and at the top
        ballCoordY = ballRadius;
        ballVelocityY *= elasticity;
      }
}

//TODO: fill won't let me change these values on the fly to make it flash
let blue = 255;
let red = 255;
let green = 0;

function drawBall(){
    fill(red, green, blue);
    ellipse(ballCoordX, ballCoordY, ballSize);
}


//runs at start 
function setup() {
    /*
    createCanvas has a 3rd parameter which can make the project 3d,
    this also changes the origin (0,0,0) to the center of a 3d euclidian plane
    as oppose to the top left of the canvas
    */
    var canvas = createCanvas(canvasWidth, canvasHeight); 

    //is this what decides which p5 element you're drawing to?
    //so say you had two canvases you could choose which one to 
    //draw to?
    canvas.parent("p5container");
}



function draw() {
    background(50);

    
    updateBall();
    drawBall();
    

}