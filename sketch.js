var tower, ghost, ground, door, railing;
var gameState = "play";

function preload(){
tower_Image = loadImage("tower.png");
ghostImage = loadImage("ghost-standing.png"); 
door_Image = loadImage("door.png");  
railingImage = loadImage("climber.png");  
}

function setup() {
createCanvas(600, 600);

tower = createSprite(300, 300);
tower.addImage(tower_Image);
  
ground = createSprite(300, 575 ,600, 5);  
ground.shapeColor = "cyan";
ground.visible = false;  
  
ghost = createSprite(300, 525);  
ghost.addImage(ghostImage);  
ghost.scale = 0.5;    
  
doorGroup = new Group();
railingGroup = new Group();
blockGroup = new Group();  
  
}

function draw() {
background("black");

if(gameState === "play"){
  tower.velocityY = 4;
  if(tower.y > 600) {
    tower.y = 300;
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -5;
  }
ghost.velocityY = ghost.velocityY + 0.4;

  
  if(keyDown("right")) {
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("left")) {
    ghost.x = ghost.x - 3;
  }
spawnDoors();  
  if(ghost.isTouching(blockGroup)){
    gameState = "end";
    ghost.destroy();
    tower.destroy();
    doorGroup.destroyEach();
    blockGroup.destroyEach();
    railingGroup.destroyEach();
  
  }
}
  else if(gameState === "end" ) {
    fill("yellow")
    textSize(20);
    textFont("Courier New")
    text("game Over", 250, 300);
  }
 ghost.collide(ground);
  drawSprites();
}

function spawnDoors() {
  if(frameCount% 200== 0){
      
  door = createSprite(300, -5);
    door.x = Math.round(random(120, 400));
  door.addImage(door_Image);
  door.velocityY = 2;
  door.lifetime = 300;  
    
  railing = createSprite(door.x, door.y + 40);  
  railing.addImage(railingImage);  
  railing.velocityY = 2;  
  railing.lifetime = 300; 
    
  block = createSprite(railing.x, railing.y + 20, railing.width, 5);
  block.velocityY = 2;  
  block.lifetime = 300;  
    
  door.depth = ghost.depth;
  railing.depth = ghost.depth;  
  ghost.depth = ghost.depth + 1; 
    
  doorGroup.add(door);
  railingGroup.add(railing);
  blockGroup.add(block);  
}
  }
