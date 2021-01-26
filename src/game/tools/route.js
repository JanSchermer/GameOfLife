import Board from '../board.js';
import Tool from './tool.js';

export default class Route extends Tool {

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

    const height = this.absSelectEndY - this.absSelectStartY
    const width = this.absSelectEndX - this.absSelectStartX

    const centerX = this.absSelectStartX + width / 2
    const centerY = this.absSelectStartY + height / 2

    for(let y = this.absSelectStartY; y <= this.absSelectEndY; y++){
      for(let x = this.absSelectStartX; x <= this.absSelectEndX; x++){

        const xOffset = Math.abs(centerX - x);
        const yOffset = Math.abs(centerY - y);
        
        const minX = width / 2 * (1 - yOffset / (height / 2))
        const minY = height / 2 * (1 - xOffset / (width / 2))

        if(xOffset < minX && yOffset < minY){
          if(this.options.filled || Math.ceil(xOffset) == Math.floor(minX) || Math.ceil(yOffset) == Math.floor(minY))
            drawMethod(board, this.options, x, y);
        }
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