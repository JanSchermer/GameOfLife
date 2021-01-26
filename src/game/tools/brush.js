import Board from '../board.js';
import Tool from './tool.js';

export default class Brush extends Tool{

  // Options: radius:num, round:bool, object:num 
  constructor(options){
    super(options);
  }

  mouseMove(event) {
    if(this.isMouseDown)
      this.draw(event, this.drawObject);
    else
      this.draw(event, this.drawBackgroud);
  }

  mouseRelease(event){
    this.draw(event, this.drawObject);
  }

  draw(event, drawMethod){
    const board = Board.current;
    const [x, y] = this.getMousePos(event);

    if(this.options.radius == 0){

      board.items[y][x] = this.options.object;

    }else{

      for(let i = this.options.radius * -1; i <= this.options.radius; i++){
        for(let j = this.options.radius * -1; j <= this.options.radius; j++){
          
          if(this.options.round && Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)) > this.options.radius)
            continue;
          
          try{
            drawMethod(board, this.options, x + j, y + i)
          }catch(e){continue;}
        }
      }

    }

  }

  drawObject(board, options, x, y) {
    board.items[y][x] = options.object;
  }

  drawBackgroud(board, options, x, y){
    board.background[y][x] = Tool.selectColor;
  }

}