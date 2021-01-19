import Board from "../board.js";
import Tool from './tool.js'

export default class Brush extends Tool{

  constructor(options){
    super(options);
    this.allowSelect = true;
  }

}