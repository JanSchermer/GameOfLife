import Board from '../board.js';

import Generation from './generation.js';
import Analytics from "./analitics.js";
import Saves from "../saves.js";

export default class Simulation {
  static current;

  generations = [];
  currentGen = 0;

  constructor(){
    this.board = Board.current;
    this.analytics = new Analytics();
    this.generations.push(new Generation(this))
    Simulation.current = this;
  }

  async setGeneration(gen){
    this.generations[this.currentGen] = new Generation(this, null)

    while(this.currentGen > gen) {
      this.generations.pop();
      this.currentGen--;
    }
    
    while(this.currentGen < gen) {
      const items = this.generations[this.currentGen].nextGen();
      const generation = new Generation(this, items);
      this.generations.push(generation);
      this.currentGen++;
    }
    
    this.board.items = this.generations[this.currentGen].items;

    Saves.save("Auto Save");
  }

  reset(keepBoard) {
    const items = this.board.items;

    this.setGeneration(0);
    if(keepBoard) this.board.items = items;
  }

}











