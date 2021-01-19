import Board from "../board.js";
import Tool from './tool.js'

export default class Brush extends Tool{

  // Options: radius:num, round:bool, object:num 
  constructor(options){
    super(options);
  }

  mouseMove(event) {
    this.draw(event);
  }

  mouseRelease(event){
    this.draw(event);
  }

  draw(event){
    const board = Board.current;
    const [x, y] = this.getMousePos(event);

    if(this.isMouseDown || event.type == "mouseup"){
      
      if(this.options.radius == 0){

        board.items[y][x] = this.options.object;

      }else{

        for(let i = this.options.radius * -1; i <= this.options.radius; i++){
          for(let j = this.options.radius * -1; j <= this.options.radius; j++){
            
            if(this.options.round && Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2)) > this.options.radius)
              continue;

            board.items[y + i][x + j] = this.options.object;
          }
        }

      }

    }

  }

}