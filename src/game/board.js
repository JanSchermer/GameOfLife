export default class Board{
  static current;

  constructor(height, width, resolution, items, options){
    this.active = true;
    this.height = height;
    this.width = width;
    this.resolution = resolution;

    this.createBoard();
    if(items != null) this.items = items;
    
  }

  append(canvas) {
    this.canvas = document.getElementById(canvasId);
    this.context = canvas.getContext("2d");

    this.canvas.height = height;
    this.canvas.width = width;

    this.draw();
  }

  makeDefault() {
    Board.current = this;
  }

  createBoard() {

    this.items = new Array(this.height / this.resolution).fill(null).map(x =>
      new Array(this.width / this.resolution).fill(0));
      
    this.background = new Array(this.height / this.resolution).fill(null).map(x =>
      new Array(this.width / this.resolution).fill("white"));
    
  }

  draw(){
    const board = Board.current;
    const ctx = board.context;

    for(let y = 0; y < board.height / board.resolution; y++){
      for(let x = 0; x < board.width / board.resolution; x++){
        
        // Draw backgorund
        ctx.beginPath();
        ctx.rect(board.resolution * y, board.resolution*  x, board.resolution, board.resolution);
        ctx.fillStyle = board.background[y][x];
        ctx.fill();
        ctx.stroke();

        // Draw items
        const item = board.items[y][x];
        if(item != 0){

          ctx.beginPath();
          ctx.arc(board.resolution * y + board.resolution / 2, board.resolution * x + board.resolution / 2, board.resolution / 2.5, 0, Math.PI * 2)
          ctx.fillStyle = "green"
          ctx.fill();

        }
  
      }
    }

    if(board.active) window.requestAnimationFrame(board.draw)
  }

}