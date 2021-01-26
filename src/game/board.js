import Item from "./item"

export default class Board{
  static FRAME_RATE = 30;
  static current;

  constructor(height, width, resolution, items, options){
    this.active = true;
    this.height = height;
    this.width = width;
    this.resolution = resolution;
    this.options = options;

    this.createBoard();
    if(items != null) this.items = items;
    
  }

  append(canvas) {
    this.canvas = document.getElementById(canvas);
    this.context = this.canvas.getContext("2d");

    this.canvas.height = this.height;
    this.canvas.width = this.width;

    Board.current = this;
    this.draw();
  }

  createBoard() {

    this.items = new Array(this.height / this.resolution).fill(null).map(() =>
      new Array(this.width / this.resolution).fill(0));
      
    this.background = new Array(this.height / this.resolution).fill(null).map(() =>
      new Array(this.width / this.resolution).fill("white"));
    
  }

  draw(){
    const board = Board.current;
    const ctx = board.context;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for(let y = 0; y < board.height / board.resolution; y++){
      for(let x = 0; x < board.width / board.resolution; x++){
        
        // Draw backgorund
        ctx.beginPath();
        ctx.rect(board.resolution * y, board.resolution*  x, board.resolution, board.resolution);
        ctx.fillStyle = board.background[y][x];
        ctx.fill();
        
        // Draw Grid
        if(board.options.showGrid)
          ctx.stroke();

        // Draw items
        const item = new Item(board.items[y][x]);
        if(item.type != "air"){

          ctx.beginPath();
          if(item.shape == "circle")
            ctx.arc(board.resolution * y + board.resolution / 2, board.resolution * x + board.resolution / 2, board.resolution / 2.5, 0, Math.PI * 2);
          
          else if(item.shape == "square")
            ctx.rect(board.resolution * y + board.resolution / 6, board.resolution * x + board.resolution / 6,  board.resolution - board.resolution / 3, board.resolution - board.resolution / 3);

          ctx.fillStyle = item.color;
          ctx.fill();

          if(item.infected) {
            ctx.beginPath();
            ctx.arc(board.resolution * y + board.resolution / 2, board.resolution * x + board.resolution / 2, board.resolution / 7, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
          }
          
        }
  
      }
    }

    // Draw border
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.rect(0 + ctx.lineWidth / 2, 0 + ctx.lineWidth / 2, board.height - ctx.lineWidth, board.width - ctx.lineWidth);
    ctx.strokeStyle = "#673ab7";
    ctx.stroke();

    if(board.active) setTimeout(board.draw, 1000 / Board.FRAME_RATE);
  }

}