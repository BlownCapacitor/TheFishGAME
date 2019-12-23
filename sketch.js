var START = 0;
var PLAY = 1;
var END = 3;
var timeUp = 4;
var gameState = START;

var fish, fish_running, fish_collided;

var worm;
//var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


var gameOver, restart,play;
var count = 0;

function preload(){
  backgroundImg = loadImage("Trees.png");
  fish_running =  loadAnimation("fishflap.png","fishpop.png","fishstill.png");
  fish_collided = loadAnimation("fishstill.png");
  bubbleimg  = loadImage("bubble.png");
  groundImage = loadImage("ground2.png");
  sound = loadSound('DOG.mp3');
  popsound = loadSound('jump.mp3');
  //cloudImage = loadImage("cloud.png");
  playimg = loadImage("play.png");
  grenadeimg = loadImage("grenade.png");
  plastic1 = loadImage("plastic1.png");
  plastic2 = loadImage("plastic2.png");
  plastic3 = loadImage("plastic3.png");
  crossimg = loadImage("cross.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  starimg = loadImage("star.png");
  burstimg = loadImage("electric.png");
  food1= loadImage("worm.png");
  food2 = loadImage("bone.png");
  food3 = loadImage("dead_fish.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  fish = createSprite(50, height-70,20,50);
  fish.addAnimation("running", fish_running);
  fish.addAnimation("collided", fish_collided);
  fish.scale = 0.3;
  count = 0;
//ground = createSprite(width/2,height,width,2);
//ground.addImage("ground",groundImage);
//ground.x = ground.width /2;
//ground.velocityX = -6;
  
  gameOver = createSprite(windowWidth/2,windowHeight/2 + 50);
  gameOver.addImage(gameOverImg);
  gameOver.tint = (0,255,7);
  restart = createSprite(windowWidth/2,windowHeight/2+ 150);
  restart.addImage(restartImg);
  play = createSprite(windowWidth/2,windowHeight/2);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  play.scale = 0.2;
  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  // cloudsGroup = new Group();
  obstaclesGroup = new Group();
  foodsGroup = new Group();
  starGroup = new Group();
  crossGroup = new Group();
  burstGroup  = new Group();
  grenadeGroup = new Group();
  bubbleGroup = new Group();
  score = 50;
}

function draw() {
  background(backgroundImg);
 //sound.play();
  
  if(score < 20 && score > 0|| score === 20 ){
  textSize(30);
  fill(255, 0, 0);
  text("Health: "+ score, windowWidth/2,windowHeight/2 - 280);
}

  if (score > 20 && score < 300){
  textSize(30);
  fill(255,255,0);
  text("Health: "+ score, windowWidth/2,windowHeight/2 - 280);
  //sound.play();
}
if (score === 300 || score > 300){
  textSize(30);
  fill(0,255 , 0);
  text("Health: "+ score, windowWidth/2,windowHeight/2 - 280);
}
if(score === 0 || score < 0){
  textSize(40);
  fill(255,4,4);
  text( "Your fish is dead",windowWidth/2,windowHeight/2 -280 );
//dieSound.play();
}
 

//for(i = 100; i > 1; i -= 1){
   //text(i,windowWidth/2+50,windowHeight/2+50);
//}
if(gameState === START){
play.visible = true;
play.addImage(playimg);
if(touchStart||mousePressedOver(play)){
  gameState = PLAY;
 
}
spawnBubbles();
}

  if (gameState===PLAY){
    if(World.frameCount%100 === 0){
      score = score -1 ;
    }
   play.visible = false;
    fish.x = World.mouseX || touchX;
    fish.y = World.mouseY || touchY;
   
    //if(keyDown("space") && fish.y >= 159) {
     // jumpSound.play();
     // fish.velocityY = -14;
  // fish.velocityX = 1;
   // }
  
    //fish.velocityY = fish.velocityY + 0.8
  count = count + Math.round(getFrameRate()/60);
   // if (ground.x < 0){
    //}
    textSize(30);
    fill(255,0,255);
    text("Time:"+count,width  - 150, height - 700);
    if(count === 700){
      gameState = timeUp;
    }
   
    //fish.collide(invisibleGround);
    //spawnClouds();
    spawnObstacles();
    spawnFood();
    spawnBurst();
    spawnCross();
    spawnStar();
    spawnGrenade();
    spawnBubbles();
    if(score < 0){
      gameState = END;
    }
  if(starGroup.isTouching(fish)){
  
    score = Math.round(score * 2);
   starGroup.destroyEach();
   popsound.play();
  }
  if (foodsGroup.isTouching(fish)){
    foodsGroup.destroyEach();
 foodsGroup.destroyEach();
 score = Math.round(score + 5);
  popsound.play();
}
 if(burstGroup.isTouching(fish)){
  //this is temporary
  burstGroup.destroyEach();
  score = Math.round(score + 50 );
  popsound.play();

}
 if(crossGroup.isTouching(fish)){
  score = Math.round(score - 50);
 crossGroup.destroyEach();
 dieSound.play();
}

 
  if(grenadeGroup.isTouching(fish)){
    score = Math.round(score /2);
  grenadeGroup.destroyEach();
  dieSound.play();
}
  if(obstaclesGroup.isTouching(fish)){
      dieSound.play();  
      score = Math.round(score - 10);
      obstaclesGroup.destroyEach();  
   
    }
  
 
}
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    play.visible = false;
    //set velcity of each game object to 0
   // ground.velocityX = 0;
    fish.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   // cloudsGroup.setVelocityXEach(0);
   
    if(score > 300){
      textSize(40);
      fill(255,0,255);
      text("Your fish is happily hopping away!",windowWidth/2 - 200,windowHeight/2+20);

    }
    else if( score < 300 && score > 0){
      textSize(40);
      fill(255,0,255);
      text("Your fish's health is below 300, and is sadly sulking!",windowWidth/2 - 200,windowHeight/2+20);
    }
    //change the fish animation
    fish.velocityY = -4;
    
    count = 0;
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   // cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    spawnBubbles();
  }
  
 if(gameState === timeUp){
   textSize(40);
   fill(0,0,0);
   text("Time is up", windowWidth/2 - 50,windowHeight/2 - 50);
   gameState = END;
  
   
  }
  drawSprites();
}
function spawnBubbles(){
  if(frameCount % 35=== 0) {
  var bubble = createSprite(random(windowWidth/2 - 700,windowWidth/2 + 700),random(windowHeight/2,windowHeight/2 + 700))
  bubble.scale = 0.009;
  bubble.velocityY = -4;
  bubble.addImage(bubbleimg);
  bubbleGroup.add(bubble);

}
}
function spawnStar(){
  if(frameCount % 555 === 0) {
  var star = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
  star.velocityX = -2;
   star.addImage(starimg);
  
star.scale = 0.2;
star.lifetime = 300;
starGroup.add(star);
}
}
function spawnBurst(){
  if(frameCount % 600 === 0) {
  var burst = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
  burst.velocityX = -2;
   burst.addImage(burstimg);
   if(frameCount%600===0){
    burst.velocityX = burst.velocityX - 2;
  }
burst.scale = 0.2;
burst.lifetime = 300;
burstGroup.add(burst);
}
}
function spawnCross(){
  if(frameCount % 300 === 0) {
  var cross = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
  cross.velocityX = -2;
   cross.addImage(crossimg);
   if(frameCount%300===0){
    cross.velocityX = cross.velocityX - 2;
  }
cross.scale = 0.2;
cross.lifetime = 300;
crossGroup.add(cross);
}
}
function spawnGrenade(){
  if(frameCount % 180 === 0) {
  var grenade = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
  grenade.velocityX = -2;
   grenade.addImage(grenadeimg);
   
grenade.scale = 0.2;
grenade.lifetime = 300;
grenadeGroup.add(grenade);
}
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
    obstacle.velocityX = -2;
    if(frameCount%60===0){
      obstacle.velocityX = obstacle.velocityX - 0.5;
    }
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(plastic1);
              break;
      case 2: obstacle.addImage(plastic2);
              break;
      case 3: obstacle.addImage(plastic3);
              break;
     // case 4: obstacle.addImage(grenade);
             // break;
     // case 5: obstacle.addImage(cross);
              default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function spawnFood() {
  if(frameCount % 200 === 0) {
    var food = createSprite(random(0,windowWidth),random(0,windowHeight),10,40);
    food.velocityX = -2;
    if(frameCount%200===0){
      food.velocityX = food.velocityX - 0.5;
    }
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: food.addImage(food1);
              break;
      case 2: food.addImage(food2);
              break;
      case 3: food.addImage(food3);
              break;
    
     // case 5: food.addImage(burst);
              default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    food.scale = 0.2;
    food.lifetime = 300;
    //add each obstacle to the group
    foodsGroup.add(food);
  }
}





//function spawnCross(){

//}
//function spawnGrenade(){

//}
//function spawnBurst(){
  
//}

function reset(){
  gameState = START;
  //ground.velocityX = -6 ;
  gameOver.visible = false;
  restart.visible = false;
  foodsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  starGroup.destroyEach();
  crossGroup.destroyEach();
  //cloudsGroup.destroyEach();
  grenadeGroup.destroyEach();
  burstGroup.destroyEach();
  bubbleGroup.destroyEach();
  fish.changeAnimation("running",fish_running);
  
 score = 50;
  
}
