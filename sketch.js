var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gameState ="fight"
var bullets=70
var score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie_img=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  heart1_img=loadImage("assets/heart_1.png")
  heart2_img=loadImage("assets/heart_2.png")
  heart3_img=loadImage("assets/heart_3.png")
}

function setup() {
  
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
 
 heart1=createSprite(displayWidth-150,40,20,20)
 heart1.addImage(heart1_img)
 heart2=createSprite(displayWidth-100,40,20,20)
 heart2.addImage(heart2_img)
 heart3=createSprite(displayWidth-50,40,20,20)
 heart3.addImage(heart3_img)
 heart1.scale=0.4
 heart2.scale=0.4
 heart3.scale=0.4
 heart1.visible=false
 heart2.visible=false
//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   zombieGroup=new Group()
   bulletGroup=new Group()
}

function draw() {
  background(0); 
  


if(gameState==="fight"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if (keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+5
}
if (keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-5
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet=createSprite(displayWidth-1150,player.y-30,10,10)
 bullet.velocityX=20;
 bulletGroup.add(bullet)
 player.depth=bullet.depth
 player.depth=player.depth+2
player.addImage(shooter_shooting)
bullets=bullets-1; 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (bullets==0){
  gameState="bullet"
}
if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup.isTouching(player)){
    zombieGroup[i].destroy()
  }
}}
spawnZombie()
}
drawSprites();
text("score="+score,displayWidth-200,displayHeight/2-200)
if(gameState=="lost"){
  textSize(100)
  fill("red")
  text("you lost the game",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState=="won"){
  textSize(100)
  fill("yellow")
  text("you won the game",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState=="bullet"){
  textSize(100)
  fill("red")
  text(" you ran out of the bullets",400,400)
  zombieGroup.destroyEach()
  player.destroy()
  bulletGroup.destroyEach()
}
}
function spawnZombie() {
  if(frameCount % 60 === 0) {
    var enemy = createSprite(random(500,1100),random(100,500),40,40);
    enemy.addImage(zombie_img)
    enemy.scale=0.15
    enemy.velocityX = -3
    //generate random obstacles
    var rand = Math.round(random(1,6));
    zombieGroup.add(enemy)
  }
}