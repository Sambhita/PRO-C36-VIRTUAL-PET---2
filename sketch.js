var database ;
var dog;
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed
//Create variables here

function preload()

{
  up = loadImage("images/dogImg.png")
  down = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(up)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

  ///text("pleasure to meet you")
} 

function draw(){
 background("yellow");

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
  fill("black");
  textSize(25);
  textFont('Georgia');
  textStyle(BOLD);
  text("Hi, I am jimi",500,350);
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
dog.addImage(up)
position++
database.ref('/').update({
  Food:position
  
}

)
}
function FeedDog(){

dog.addImage(down)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
