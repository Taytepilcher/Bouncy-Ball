
/*

TODO: 
    1. Make object of ball, with x, y, size, rgb, name etc
    2. improve the physics


*/



let canvasWidth = 900
let canvasHeight = 900


var ballSize = 200;
var ballCoordX = canvasWidth/2;
var ballCoordY = canvasHeight/2;

//needed for bouncing
var ballMass = 20;       //mass
var ballVelocity = 10;    //velocity 
var ballAcceleration = 3;   //acceleration
var ballElasticity = 0.9;//elasticity

var ballPeakHeight = canvasHeight/2; 


var collidedBottom = false;
var collidedTop = false;
var collidedLeft = false;
var collidedRight = false;



function updateBall(){
      //find edges
      var bottomOfBall = (ballCoordY + (ballSize/2));
      var leftSideOfBall = (ballCoordX - (ballSize/2));
      var rightSideOfBall = (ballCoordX + (ballSize/2));
      var topOfBall = (ballCoordY - (ballSize/2));

      /*
      »»»DEALING WITH COLLISION«««
        the ball falls in line with the force of gravity, 
        which always points directly downward. On earth, 
        this acceleration due to gravity is 9.8 m/s2 (g= 9.8 m/s2). 
        This means, in essence, that for every second for falling, 
        the ball's velocity will accelerate by 9.8 m/s.
     */
     
     //if the ball is moving, and not just sitting at the bottom
     if((ballPeakHeight < canvasHeight - (ballSize/2))){
       //ball is falling
        if(!collidedBottom){ 
          
          //acceleration due to gravity
          ballCoordY = ballCoordY + (ballVelocity + 9.8); //move ball down with added effect of gravity
          
          //ball has hit the bottom
          if(bottomOfBall >= canvasHeight){
              collidedBottom = true;
              ballVelocity -= ballElasticity; //ball loses velocity based on how elastic it is
              ballVelocity = -ballVelocity;   //flip velocity so it bounces up
              ballPeakHeight += ballElasticity * 30; //decrease the peak height, i think this is unnecesssary TODO   
           }

        
        }//ball is coming up
        else{

            if(ballCoordY <= ballPeakHeight){
                collidedBottom = false;       //has hit the top, velocity needs to be flipped again
                ballVelocity = -ballVelocity;
            }

            ballCoordY = ballCoordY + ballVelocity; //move ball up
        }

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


//main function, while(true)??
function draw() {
    background(50);
    updateBall();
    drawBall();
}