import Board from '../board.js';
import Tool from './tool.js';

export default class Line extends Tool{

  // Options: object:num, density:num(0-100)
  constructor(options){
    super(options);
  }

  mouseMove(event) {
    const [x, y] = this.getMousePos(event);

    const yOffset = Math.abs(this.selectStartY - y);
    const xOffset = Math.abs(this.selectStartX - x);

    if(yOffset < xOffset) {
      this.absSelectStartY = this.selectStartY;
      this.absSelectEndY = this.selectStartY;
    } else{
      this.absSelectStartX = this.selectStartX;
      this.absSelectEndX = this.selectStartX;
    }
    for(let y = this.absSelectStartY; y <= this.absSelectEndY; y++){
      for(let x = this.absSelectStartX; x <= this.absSelectEndX; x++){
        this.drawBackgroud(Board.current, this.options, x, y);
      }
    }

  }

  mouseRelease() { 
    for(let y = this.absSelectStartY; y <= this.absSelectEndY; y++){
      for(let x = this.absSelectStartX; x <= this.absSelectEndX; x++){
        this.drawObject(Board.current, this.options, x, y);
        this.drawBackgroud(Board.current, this.options, x, y);
      }
    }
  }

  drawObject(board, options, x, y) {
    if(Math.random() * 100 < options.density)
      try{
        board.items[y][x] = options.object;
      }catch(e){return;}
  }

  drawBackgroud(board, options, x, y){
    try{
      board.background[y][x] = Tool.selectColor;
    }catch(e){return;}
  }

}