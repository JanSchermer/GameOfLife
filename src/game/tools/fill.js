import Board from '../board.js';
import Tool from './tool.js';

export default class Fill extends Tool {

  // Options: object:num, density:num(0-100)
  constructor(options){
    super(options);
  }

  mouseMove(event) {
    const board = Board.current;
    const [x, y] = this.getMousePos(event);

    if(board.items[y][x] != this.options.object)
      this.fill(x, y, board.items[y][x]);
  }

  mouseRelease(event){
    const board = Board.current;

    for(let y = 0; y < board.background.length; y++){
      for(let x = 0; x < board.background[y].length; x++){
        if(board.background[y][x] != "white")
          this.drawObject(board, this.options, x, y);
      }
    }
  }

  fill(x, y, target){
    const board = Board.current;

    try {
      if(board.background[y][x] != "white" || board.items[y][x] != target)
        return;
    }catch (e) {return;}
    
    board.background[y][x] = "#5193fc";

    this.fill(x+1, y, target);
    this.fill(x-1, y, target);
    this.fill(x, y+1, target);
    this.fill(x, y-1, target);

  }

  drawObject(board, options, x, y) {
    if(Math.random() * 100 < options.density)
      board.items[y][x] = options.object;
  }

}