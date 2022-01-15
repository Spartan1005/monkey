var monkey , monkey_running
var banana ,bananaImage, stone, stoneImage
var foodsGroup, stoneGroup
var survivalTime=0;
var ground
var score
var background, backImage

function preload(){
  
  
monkey_running =  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_04.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  backImage = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(600, 500);
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x)
  ground.addImage(backImage);
  ground.visibility=false;
  
 
  
  //create Obstacle and Cloud Groups
  stoneGroup = createGroup();
  foodsGroup = createGroup();

  
  monkey.setCollider("circle",0,0,30);
  
  
  
}

function draw() {
  
  background(180);
  //displaying score
stroke("white")
textSize(20)
fill("white")
text("score: "+ score, 500, 50)


  
    if(keyDown("space")&& monkey.y >= 158) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnstones();
  
    //spawn obstacles on the ground
    spawnfoods();
    
    if(stoneGroup.isTouching(monkey)){
      monkey.scale=monkey.scale-0.1;
    }
  
  if(foodsGroup.isTouching(monkey)){
      monkey.scale=monkey.scale+0.1;
    banana.lifeTime=0;
  }
 
  monkey.collide(ground);

drawSprites();


stroke("white")
textSize(20)
fill("white")
text("score: "+ score, 500, 50)

}

function spawnstones(){
 if (frameCount % 300 === 0){
   var stone = createSprite(600,165,10,40);
   stone.velocityX = -(6 + 3*score/100);
   
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.5;
    stone.lifetime = 300;
   
   //add each obstacle to the group
    stoneGroup.add(stone);
 }
}

function spawnfoods() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,random(10,100),40,10);
    banana.y = Math.round(random(10,100));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    foodsGroup.add(banana);
  }
}

