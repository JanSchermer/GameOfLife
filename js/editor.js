import Board from './board.js';

export default class Editor{

  constructor(){
    this.active = true;

    const canvas = Board.current.canvas;

    canvas.addEventListener('click', this.click);

  }

}