import Board from '../board.js';
import Tool from './tool.js'

export default class Line extends Tool{

  // Options: object:num
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

    for(let i = this.absSelectStartY; i <= this.absSelectEndY; i++){
      Board.current.items[i].fill(this.options.object, this.absSelectStartX, this.absSelectEndX+1);
    }

  }

}