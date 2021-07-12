var pathImg, knightImg, zombieImg
var collided = 0
var playerHealth = 6;
var zombieHealth = 4;
var gameState = 0;
var timer = 30;
var text1 = true
var txttime = 60
function preload(){
 pathImg = loadImage("Images/path.jpg");
 knightImg = loadAnimation("Images/tile012.png","Images/tile013.png","Images/tile014.png");
 knightImg2 = loadAnimation("Images/tile013.png");
 knightImg3 = loadAnimation("Images/tile014.png");
 zombieImg = loadImage("Images/zombie.png");
 knifeImg = loadImage("Images/knife.png");
 heartImg = loadImage("Images/health.png");
 ZombieHealth = loadImage("Images/ZombieHealth.png");
 knockbacked = loadImage("Images/Knockbacked.jpg")
 EmptyHeart = loadImage("Images/blank health.png")
}



function setup() {
  createCanvas(displayWidth,displayHeight-200);
  path = createSprite(width/2,height/2);
  path.addImage(pathImg);
  path.scale = 2.5;

  knight = createSprite(width-100,height-100);
  knight.addAnimation("standing",knightImg2);
  knight.addAnimation("walking",knightImg);
  knight.addAnimation("jumping",knightImg3);

  ground = createSprite(width-750,height-60,1500,10);
  ground.visible = false;

  zombie = createSprite(random(100,width-100),0)
  zombie.addImage(zombieImg);
  zombie.velocityY = 10;
  zombie.scale = 0.25;
  
  knife = createSprite(800,height-80);
  knife.addImage(knifeImg);
  knife.scale = 0.07;
  knife.mirrorX(-1);


}

function draw() {
  background(255,255,255);  

  console.log(zombieHealth);

  knight.velocityX = 0
  knight.changeAnimation("standing",knightImg2);

  if(keyDown("a") && (gameState ===0 ||gameState ===1)){
    knight.velocityX = -3;
    knight.changeAnimation("walking",knightImg);
    knight.mirrorX(1);
  }

  if(keyDown("d")&& (gameState ===0 ||gameState ===1)){
    knight.velocityX = 3;
    knight.changeAnimation("walking",knightImg);
    knight.mirrorX(-1);

  }

  if(keyDown("w")&&knight.y>height-130&& (gameState ===0 ||gameState ===1)){
    knight.velocityY = -5;
    knight.changeAnimation("jumping",knightImg3);
  }
  
  if(knight.isTouching(knife)){
   gameState = 1;
   txttime--
   knife.scale = 0.1;
   knife.y = knight.y;
   if(keyDown("a")){
    knife.x = knight.x-17;
    knife.mirrorX(-1)
   }
   if(keyDown("d")){
    knife.x = knight.x+15;
    knife.mirrorX(1)
   }
  }

  //knight.debug = true;
  //zombie.debug = true;
  knight.setCollider("rectangle",-10,0,40,80);
  zombie.setCollider("rectangle",-5,-10,200,300);

  if(gameState === 1 &&zombie.isTouching(knife)&& mouseWentDown("leftButton")){
    zombie.x = zombie.x*1.15
    zombieHealth = zombieHealth-2;
  }

  if(gameState === 1 &&knight.isTouching(zombie) && timer === 30){
    knight.x = knight.x*1.15
    playerHealth = playerHealth-2;
    if(knight.velocityX<0){
      knife.x = knight.x-17;
    knife.mirrorX(-1)
    }
    if(knight.velocityX>0){
      knife.x = knight.x+15;
    knife.mirrorX(1)
    }
  }
  if(gameState ===1){
    timer--
  }
 if(timer<=0){
   timer = 60
 }
 console.log(timer)

  zombie.depth = knife.depth+1;

  knight.velocityY+=0.2;

  knight.collide(ground);
  
  if(zombie.collide(ground)){
    collided = 1
  }
  
  if(collided ===1 && knight.x>zombie.x){
    zombie.velocityX = 2
} else {
  zombie.velocityX =- 2
}


drawSprites();


if(playerHealth===6){
  image(heartImg,50,50,20,20)
  image(heartImg,70,50,20,20)
  image(heartImg,90,50,20,20)
  image(heartImg,110,50,20,20)
  image(heartImg,130,50,20,20)
  image(heartImg,150,50,20,20)
  image(EmptyHeart,160,48,40,25)
  image(EmptyHeart,180,48,40,25)
  
}

if(playerHealth===5){
  image(heartImg,50,50,20,20)
  image(heartImg,70,50,20,20)
  image(heartImg,90,50,20,20)
  image(heartImg,110,50,20,20)
  image(heartImg,130,50,20,20)
  image(EmptyHeart,140,48,40,25)
  image(EmptyHeart,160,48,40,25)
  image(EmptyHeart,180,48,40,25)
  
}

if(playerHealth===4){
  image(heartImg,50,50,20,20)
  image(heartImg,70,50,20,20)
  image(heartImg,90,50,20,20)
  image(heartImg,110,50,20,20)
  image(EmptyHeart,120,48,40,25)
  image(EmptyHeart,140,48,40,25)
  image(EmptyHeart,160,48,40,25)
  image(EmptyHeart,180,48,40,25)
}

if(playerHealth===3){
  image(heartImg,50,50,20,20)
  image(heartImg,70,50,20,20)
  image(heartImg,90,50,20,20)
  image(EmptyHeart,100,48,40,25)
  image(EmptyHeart,120,48,40,25)
  image(EmptyHeart,140,48,40,25)
  image(EmptyHeart,160,48,40,25)
  image(EmptyHeart,180,48,40,25)
}
if(playerHealth===2){
  image(heartImg,50,50,20,20)
  image(heartImg,70,50,20,20)
  image(EmptyHeart,80,48,40,25)
  image(EmptyHeart,100,48,40,25)
  image(EmptyHeart,120,48,40,25)
  image(EmptyHeart,140,48,40,25)
  image(EmptyHeart,160,48,40,25)
  image(EmptyHeart,180,48,40,25)
}

if(playerHealth===1){
  image(heartImg,50,50,20,20)
  image(EmptyHeart,60,48,40,25)
  image(EmptyHeart,80,48,40,25)
  image(EmptyHeart,100,48,40,25)
  image(EmptyHeart,120,48,40,25)
  image(EmptyHeart,140,48,40,25)
  image(EmptyHeart,160,48,40,25)
  image(EmptyHeart,180,48,40,25)
}

if(playerHealth<=0){
  gameState = 2;
  
}

if(gameState ==2){
 fill("red")
 textSize(20);
 text("GAME OVER",width/2,height/2);
 zombie.velocityX = 0;
 knight.velocityX = 0;
 knight.velocityY = 0;
 knight.rotation = 90;
 knife.destroy();
 knight.y = knight.y +20;
 knight.changeAnimation("standing",knightImg2);
}

if(zombieHealth<=0){
  gameState = 3;
  
}

if(gameState ===3){
 fill("green")
 textSize(20);
 text("YOU WIN!",width/2,height/2);
 zombie.velocityX = 0;
 knight.velocityX = 0;
 knight.velocityY = 0;
 zombie.rotation = 90;
 knife.destroy();
 zombie.y = zombie.y +20;
 
}




if(zombieHealth===4){
  image(ZombieHealth,width-150,50,30,20)
  image(ZombieHealth,width-170,50,30,20)
  image(ZombieHealth,width-190,50,30,20)
  image(ZombieHealth,width-210,50,30,20)
  
}

if(zombieHealth===3){
  image(ZombieHealth,width-150,50,30,20)
  image(ZombieHealth,width-170,50,30,20)
  image(ZombieHealth,width-190,50,30,20)
  
}
if(zombieHealth===2){
  image(ZombieHealth,width-150,50,30,20)
  image(ZombieHealth,width-170,50,30,20)

}

if(zombieHealth===1){
  image(ZombieHealth,width-150,50,30,20)

}

if(gameState === 0 && text1=== true){
  textSize(17);
  fill("white");
  text("Use W,A,D to move", knight.x-60,knight.y - 60);
}

if(keyDown("w")||keyDown("a")||keyDown("d") && gameState === 0){
  text1 = false
}
if(text1 === false && gameState === 0){
  textSize(17);
  fill("white")
  text("Grab the sword by walking up to it",knight.x-100,knight.y - 60)
}

if(gameState===1 && txttime>0){
  textSize(17);
  fill("white")
  text("Hit the zombie using left-click",knight.x-100,knight.y - 60)
}

 //textFont("")
 fill("red")
 textSize(18);
 text("Player Health",80,30);
 fill("green")
 text("Zombie Health",1150,30);


  
}

