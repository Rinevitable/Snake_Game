//start of game
function init(){
  canvas = document.getElementById('my_canvas');
  W=H=canvas.width=canvas.height=600;
  pen=canvas.getContext('2d');
  cellSize=40;
  game_over =false;
  score=3;
  //creating images for trophy and food
  food_img=new Image();
  food_img.src="data/apple.png";
  trophy =new Image();
  trophy.src ="data/trophy.png";
  //getting random food
  food= getRandomFood();
  //create a snake Object
  snake={
    s_len:3,
    color:"red",
    cells:[],
    direction:"right",

    createSnake:function(){
      //here array is storing (3,0);(2,0);(1,0);
      //so when you pop it will knock out the 1st cell of snake from last ;
      for(var i=this.s_len;i>0;i--){
        // pushing the (x,y) coordinates as an object in an array
        this.cells.push({x:i,y:0});
      }
    },
    drawSnake:function(){
      for(var i=0;i<this.cells.length;i++){
        //filling rectangles acc. to cells in the cells array,also leaving a 3pxl gap to make out distinction
        pen.fillStyle=this.color;
        pen.fillRect(this.cells[i].x*cellSize,this.cells[i].y*cellSize,cellSize-3,cellSize-3);
      }
    },
    updateSnake: function(){
      //pop when food is not consumed
      var headX=this.cells[0].x;
      var headY=this.cells[0].y;
      if(headX==food.x && headY==food.y){
        food=getRandomFood();
        score++;
      }
      else{
        this.cells.pop();
      }

      var newHeadX,newHeadY;

      if(this.direction=="right"){
        newHeadX=headX+1;
        newHeadY=headY;
      }
      else if (this.direction=="left") {
        newHeadX=headX-1;
        newHeadY=headY;
      }
      else if (this.direction=="down") {
        newHeadX=headX;
        newHeadY=headY+1;
      }
      else{
        newHeadX=headX;
        newHeadY=headY-1;
      }
      this.cells.unshift({x:newHeadX,y:newHeadY});
      //logic for game_over
      var last_x=Math.round(W/cellSize);
      var last_y=Math.round(H/cellSize);
      if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
        game_over=true;
      }
    },

  };
  snake.createSnake();
  //adding event Listener
  function keyPressed(o){
    if(o.key=="ArrowRight"){
      snake.direction="right";
    }
    else if (o.key=="ArrowLeft") {
      snake.direction="left";
    }
    else if (o.key=="ArrowDown") {
      snake.direction="down";
    }
    else{
      snake.direction="up";
    }
  }
  document.addEventListener('keydown',keyPressed);
}
//drwing on canvas
function draw(){
  //clearing the previous frame
  pen.clearRect(0,0,W,H);

  snake.drawSnake();

  pen.drawImage(food_img,food.x*cellSize,food.y*cellSize,cellSize,cellSize);

  pen.drawImage(trophy,17,18,cellSize,cellSize);
  pen.fillStyle="blue";
  pen.font="30px Roboto";
  pen.fillText(score,29,42);
}
//updating the game
function update(){

  snake.updateSnake();
}
//this will get hoisted
function getRandomFood(){
  var foodX=Math.round(Math.random()*(W-cellSize)/cellSize);
  var foodY=Math.round(Math.random()*(H-cellSize)/cellSize);
  var food={
    x:foodX,
    y:foodY,
  }
  return food;
}
//function for maintaing game over
function game_loop(){
  if(game_over==true){
    clearInterval(t);
    alert("Game Over. \nPress F5 for Replay\nYour Score: "+score);
    return;
  }
  draw();
  update();
}

init();//calling init

var t = setInterval(game_loop,110);//for moion to be seen
