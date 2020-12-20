var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var bananaScore=0;
 var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyCollide=loadImage("sprite_8.png");
}



function setup() {
  createCanvas(600, 215);
 monkey = createSprite(50,175,20,50);
 monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
    
 ground = createSprite(0,210,1200,10);
  ground.x = ground.width /2;
  bananaGroup = new Group();
  obstacleGroup = new Group();
   
}


function draw() {
  background("lightblue");
  
  fill("black");
  text("SURVIVAL TIME: "+ survivalTime, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
 
      if (monkey.isTouching(bananaGroup)){
    bananaGroup[0].destroy();
      bananaScore=bananaScore+1;  
      bananaGroup.destroyEach();
   }
  
    
    
  
  
    
    if (gameState === PLAY){ 

 spawnBanana(); 
spawnObstacle();
      survivalTime = survivalTime +
        Math.round(getFrameRate()/60);
      
      if (monkey.isTouching(obstacleGroup)){
    monkey.collide(obstacleGroup);
        gameState=END
  }
    } 
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 175;
    monkey.scale = 0.1;
    monkey.addImage("collide", monkeyCollide);
    monkey.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 120);
    fill("black");
     textSize(15);
    text("Press 'R' to play again", 250, 140);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      survivalTime = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }

drawSprites(); 
  
  if(keyDown("space") && monkey.y >= 139) {
      monkey.velocityY = -15;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
   monkey.collide(ground);
}

  
function spawnObstacle() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,187,40,40);  
    obstacle.addImage("spawn",obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.080;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
    
  }
  
}









