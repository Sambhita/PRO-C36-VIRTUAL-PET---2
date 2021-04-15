//Create variables here
var dog1;
var database;
//var dogFood,water;
//var dogFoodImg,waterImg;
var position;
var up,down;
var feed,add;
var foodObject;
var Feedtime;
var Lastfeed;
var foodStock;
var foodS;
var hour
function preload()
{
	//load images here
  down = loadImage("images/dogImg1.png");
  up = loadImage("images/dogImg.png");

}

function setup() {
	createCanvas(1000, 500);

  dog1 = createSprite(800,250,10,10);
  dog1.addImage(up);
  dog1.scale = 0.20;

  foodObject=new Food()

  //var dogo = database.ref('Food');
  //dogo.on("value", readPosition, showError);

  feed = createButton("FEED THE DOG")
  feed.position(500,15)
  feed.mousePressed(FeedDog)

  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

  database  = firebase.database();
  //foodStock = database.ref("F  ood");
  //foodStock.on("value",readStock);
  //foodStock.set(20);
  
}


function draw() {  
  background("yellow");

  foodObject.display()

  drawSprites();
  Feedtime = database.ref("FeedTime");
  Feedtime.on("value",function(data){
    Lastfeed = data.val();
  })
  Lastfed();
  getFeedTime();
}
//function readPosition(data){
  //position = data.val();
  //foodobject.updateFoodStock(position)
//}

//function showError(){
 // console.log("Error in writing to the database");
//}

//function writePosition(nazo){
 // if(nazo>0){
   // nazo=nazo-1
  //}
  //else{
   // nazo=0
 // }
  //database.ref('/').set({
   // 'Food': nazo
 // })

//}
function AddFood(){
  foodS++
database.ref('/').update({
  Food:foodS
})
}
function FeedDog(){

dog1.addImage(down)
foodObject.updateFoodStock(foodObject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodObject.getFoodStock(),
   Feedtime:hour()
 })
}
function Lastfed(){
  fill("black");
  textSize(15);
  if(Lastfeed >= 12){
    text("Last Feed: "+ Lastfeed%12 + "PM", 350,30);
  }
  else if(Lastfeed ==0){
    text("Last Feed: 12 AM", 350,30);
  }
  else{
    text("Last Feed: "+Lastfeed +"AM", 350,30);
  }
}

async function getFeedTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  hour = datetime.slice(11,13);
  
  console.log(hour)
}

