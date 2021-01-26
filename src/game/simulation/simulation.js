import Board from '../board.js';

import Generation from './generation.js';
import Analytics from "./analitics.js";

export default class Simulation {
  generations = [];
  currentGen = 0;

  constructor(){
    this.board = Board.current;
    this.analytics = new Analytics();
    this.generations.push(new Generation(this))
  }

  setGeneration(gen){
    this.generations[this.currGen] = new Generation(this)

    while(this.currentGen > gen) {
      this.generations.pop();
      this.currentGen--;
    }
    
    while(this.currentGen < gen) {
      this.generations.push(this.generations[currGen].nextGen());
    }
    
    this.board.items = this.generations[this.currentGen].items;
  }

  reset(keepBoard) {
    const items = this.board.items;

    this.setGeneration(0);
    if(keepBoard) this.board.items = items;
  }

}











