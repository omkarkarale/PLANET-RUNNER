/*
Story - You are player robo-226. You are on Planet rosea. This planet is famous for roseallum(pink metal). Your mission is to rescue programmer Omkar who were kidnapped by aliens and hided here. You have to find him and rescue. But be away from highly radiated plants which will burn you.                                                       Rules - Rules are very simple just you have to be just away from obstacles by jumping and to jump press space key.                                            Differenr Levels - After scoring some big points he will get some clues about Programmeer Omkar and robo will explore more planets to find Omkar in different levels.
*/

var groundImg, ground, invground;
var boyImg, boy, burn;
var obGp, ob1, ob2, ob3, ob4, ob5, ob6;
var score;
var gameoverImg, gameo,reI,re;
var gameState = "PLAY";

function preload(){
  groundImg = loadImage("ground.jpg");
  
  burn = loadAnimation("burn_out.PNG");
  
  boyImg = loadAnimation("boy1.PNG", "boy2.PNG", "boy3.PNG", "boy4.PNG", "boy5.PNG");
  
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  sound = loadSound("SCORE 100.mp3");
  
  gameoverImg = loadImage("gameOver.png");
  reI = loadImage("restart.png");
}

function setup() {
  createCanvas(550,380);
  
  ground = createSprite(900,200)
  ground.addImage("ground", groundImg);
  ground.scale = 2;
  
  boy = createSprite(60, 280);  
  boy.addAnimation("boy", boyImg);
  
  gameo = createSprite(270,110);
  gameo.addImage(gameoverImg);
  gameo.visible = false;
  
  invground = createSprite(280,305, 550, 5)
  invground.visible = false;
  
  re = createSprite(270,180);
  re.addImage(reI);
  re.scale = 0.8;
  re.visible = false;
  
  obGp = new Group();
 
  score = 0;

}

function draw() {
  background(180);
    drawSprites();
  
  if(gameState === "PLAY"){
    
    score = score + Math.round(getFrameRate()/60);
  
    textSize(20);
    text("Score:"+score, 450, 50);

    ground.velocityX = -(10 + score/100);;
    // boy.addAnimation("boy", boyImg);

    gameo.visible = false;
    re.visible = false;

    if(ground.x < -350){
      ground.x = 900;
    }

    if(score%100 === 0 && score>0){
      sound.play();
      console.log(score)
    }

    spawnObs();

    if(keyDown("space") && boy.y > 240){
          boy.velocityY = -12;
      }
    boy.velocityY += 0.8 ;
    
    if(boy.isTouching(obGp)){
      gameState = "END";
    } 
  }
  if(gameState === "END"){
    gameo.visible = true;
    re.visible = true;
    ground.velocityX = 0;
    obGp.setVelocityXEach(0);
    obGp.setLifetimeEach(-1);
    boy.addAnimation("boy", burn)
    boy.y = 210;
    boy.x = 30;
    if(mousePressedOver(re)){
          boy.visible = false;

      reset();
    }
  }
  boy.collide(invground); 
}

function spawnObs(){
   if (frameCount % 40 === 0){
    var ob = createSprite(550, 280, 10, 40);
    ob.velocityX = -(10 + score/100);
        var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: ob.addImage(ob1);
                break;
        case 2: ob.addImage(ob2);
                break;
        case 3: ob.addImage(ob3);
                break;
        case 4: ob.addImage(ob4);
                break;
        case 5: ob.addImage(ob5);
                break;
        case 6: ob.addImage(ob6);
                break;
        default: break;
      }
      ob.scale = 0.7;
      ob.lifetime = 550;
      obGp.add(ob)
   }
}   
function reset(){
  gameState = "PLAY";
  obGp.destroyEach();
  boy.addAnimation("boy", boyImg);
  score = 0;
  boy.x = 60;
  boy.y = 280;
  boy.visible = true;
}