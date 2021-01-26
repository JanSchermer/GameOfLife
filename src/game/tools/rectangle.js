import Board from '../board.js';
import Tool from './tool.js';

export default class Rectangle extends Tool {

  // Options: object:num, filled:bool, density:num(0-100)
  constructor(options){
    super(options);
  }

  mouseMove() {
    if(this.isMouseDown)
      this.draw(this.drawBackgroud);
  }

  mouseRelease(){
    this.draw(this.drawObject)
  }

  draw(drawMethod){
    const board = Board.current;

    for(let y = this.absSelectStartY; y <= this.absSelectEndY; y++){
      for(let x = this.absSelectStartX; x <= this.absSelectEndX; x++){

        if(!this.options.filled && y != this.absSelectStartY && y != this.absSelectEndY && x != this.absSelectStartX && x != this.absSelectEndX)
          continue;
        
        drawMethod(board, this.options, x, y);
      }
    }
  }

  drawObject(board, options, x, y) {
    if(Math.random() * 100 < options.density)
      board.items[y][x] = options.object;
  }

  drawBackgroud(board, options, x, y){
    board.background[y][x] = Tool.selectColor;
  }

}