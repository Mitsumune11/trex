var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var count = 0;

var cloudGroup,cloudImage;

var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var PLAY = 1;

var gamestate = PLAY;

var END = 0;

var gameOver;

var restart;


function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");
 
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  
   obstacle2 = loadImage("obstacle2.png");
  
    obstacle3 = loadImage("obstacle3.png");
  
   obstacle4 = loadImage("obstacle4.png");
  
   obstacle5 = loadImage("obstacle5.png");
  
   obstacle6 = loadImage("obstacle6.png");

   gameOverImage = loadImage("gameOver.png")

  restartImage = loadImage("restart.png");  
  
}

function setup() {

  createCanvas(600, 200);

  ground = createSprite(200, 170, 600, 10)
  ground.addImage("ground", groundImage);
  ground.velocityX = -7;
  ground.x = ground.width / 2;
  ground.velocityX =-(7 + count/100 * 3);
  
  trex = createSprite(50, 140, 10, 10);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.6;
  trex.setCollider("circle",0,0,35);

  
  invisibleGround = createSprite(300, 175, 600, 10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,70,10,10);
  gameOver.visible = false;
   gameOver.addImage(gameOverImage);
  gameOver.scale = 0.8;
  
  restart = createSprite(300,120,10,10);
  restart.visible = false;
  restart.addImage(restartImage);
  restart.scale = 0.7;
  
  cloudGroup = new Group();
  
  obstacleGroup = new Group();
}

function draw() {

  background(180);

  trex.collide(invisibleGround);

  trex.velocityY = trex.velocityY + 0.8;

  textSize(18);
  text("score :" + count, 224, 35);
  
  if(gamestate === PLAY){
    
   ground.velocityX =-(7 + count/100 * 3);
    
    count = count + Math.round(getFrameRate() / 60);
    
     if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
    
 if (keyDown("space") && trex.y > 137) {
    trex.velocityY = -10;
  }
    if(obstacleGroup.isTouching(trex)){
      gamestate = END; 
      gameOver.visible = true; 
    restart.visible = true;
    
    }
    
spawnobstacle();
spawnclouds();
  drawSprites();
    
  }
   
  else if(gamestate === END){
   
    ground.velocityX = 0;
  
    trex.changeAnimation("collided",trex_collided);
    
  cloudGroup.setVelocityXEach(0);
      
obstacleGroup.setVelocityXEach(0);  
  
    trex.velocityY = 0
  
    obstacleGroup.setLifetimeEach(-1);

cloudGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)){
      
reset();
     
}
  }
  drawSprites();
  }
  



function spawnclouds() {
  
  if(frameCount % 70 === 0) {
 
  var cloud = createSprite(600,120,10,10);
  cloud.addImage(cloudImage);
  
  cloud.scale = 0.7;
  cloud.velocityX = -2;
  cloudGroup.add(cloud);
  cloud.tint = "grey"; 

  cloud.lifetime = 310;
    
    
  cloud.y = Math.round(random(80, 120));

  cloud.depth = trex.depth;
  
  trex.depth = trex.depth+1;
   
}
}
 function spawnobstacle() {
   
if(frameCount % 65 === 0) { 
 
  var obstacle = createSprite(600,150,20,20);
  var rand = Math.round(random(1, 6));
  switch(rand){
   case 1 : obstacle.addImage(obstacle1); 
           break;
   case 2 : obstacle.addImage(obstacle2);        
           break;
   case 3 : obstacle.addImage(obstacle3); 
           break;
   case 4 : obstacle.addImage(obstacle4); 
           break;
   case 5 : obstacle.addImage(obstacle5); 
           break;
   case 6 : obstacle.addImage(obstacle6); 
           break;
  default : break;
           
  }    
  obstacle.scale = 0.5;
  obstacle.velocityX =-(7 + count/100 * 3); 
  
  obstacle.lifetime = 300;
  
  obstacleGroup.add(obstacle);
   
}
 }

function reset() {
  
  gamestate = PLAY; 
 
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  restart.visible = false;
  gameOver.visible = false; 

  count = 0; 

trex.changeAnimation("running",trex_running);
}



