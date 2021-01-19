import Board from './board.js';
import Editor from './editor.js';

import Brush from './tools/brush.js'
import Line from './tools/line.js'

function main(){

  const board = new Board(900, 900, 20, null);
  const editor = new Editor();

  new Line({radius: 4, round: true, object: 1}).activate();

}

main();