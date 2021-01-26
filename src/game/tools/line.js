import Board from '../board.js';
import Tool from './tool.js';

export default class Line extends Tool{

  // Options: object:num, density:num(0-100)
  constructor(options){
    super(options);
    this.selectVisible = true;
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

  }

  mouseRelease(event) { 
    for(let y = this.absSelectStartY; y <= this.absSelectEndY; y++){
      for(let x = this.absSelectStartX; x <= this.absSelectEndX; x++){
        if(Math.random() * 100 < this.options.density)
          Board.current.items[y][x] = this.options.object;
      }
    }
  }

}