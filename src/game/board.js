import Item from "./item"

export default class Board{
  static FRAME_RATE = 30;
  static current;

  constructor(height, width, resolution, items, options){
    this.active = true;
    this.height = height;
    this.width = width;
    this.resolution = resolution;

    this.createBoard();

    if(items != null) this.items = items;
    if(options != null) this.options = options;
    else this.createOptions();
  }

  createBoard() {
    this.items = new Array(this.height / this.resolution).fill(null).map(() =>
      new Array(this.width / this.resolution).fill(0));
      
    this.background = new Array(this.height / this.resolution).fill(null).map(() =>
      new Array(this.width / this.resolution).fill("white"));
  }

  createOptions() {
    const options = {
      showGrid: false,
      preventFreez: true,
      ignoreColorReproduction: false,
      ignoreColorOverpopulation: true,
      ignoreColorUnderpopulation: false,
      ignoreColorSpread: true,
      reproductionChance: 50,
      overpopulationDeathChance: 50,
      underpopulationDeathChance: 50,
      virusDeathChance: 35,
      virusSpreadChance: 50,
      virusRecoveryChance: 0,
    }

    this.options = options;
  }

  append(canvas) {
    this.canvas = document.getElementById(canvas);

    this.canvas.height = this.height;
    this.canvas.width = this.width;

    Board.current = this;
    this.draw();
  }

  draw(){
    const board = Board.current;
    Board.drawBoard(board.canvas, board.items, board.background, board.options.showGrid, 4);
    
    if(board.active) setTimeout(board.draw, 1000 / Board.FRAME_RATE);
  }

  static drawBoard(canvas, items, background, showGrid, borderWidth){
    const ctx = canvas.getContext("2d");
    const resolution = canvas.width / items.length;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    for(let y = 0; y < canvas.height / resolution; y++){
      for(let x = 0; x < canvas.width / resolution; x++){
        
        // Draw backgorund
        ctx.beginPath();
        ctx.rect(resolution * y, resolution*  x, resolution, resolution);
        ctx.fillStyle = background[y][x];
        ctx.fill();
        
        // Draw Grid
        if(showGrid)
          ctx.stroke();

        // Draw items
        const item = new Item(items[y][x]);
        if(item.type != "air"){

          ctx.beginPath();
          if(item.shape == "circle")
            ctx.arc(resolution * y + resolution / 2, resolution * x + resolution / 2, resolution / 2.5, 0, Math.PI * 2);
          
          else if(item.shape == "square")
            ctx.rect(resolution * y + resolution / 6, resolution * x + resolution / 6,  resolution - resolution / 3, resolution - resolution / 3);

          ctx.fillStyle = item.color;
          ctx.fill();

          if(item.infected) {
            ctx.beginPath();
            ctx.arc(resolution * y + resolution / 2, resolution * x + resolution / 2, resolution / 7, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
          }
          
        }
  
      }
    }

    // Draw border
    if(borderWidth > 0)
      ctx.beginPath();
      ctx.lineWidth = borderWidth;
      ctx.rect(0 + ctx.lineWidth / 2, 0 + ctx.lineWidth / 2, canvas.height - ctx.lineWidth, canvas.width - ctx.lineWidth);
      ctx.strokeStyle = "#673ab7";
      ctx.stroke();
  }

}