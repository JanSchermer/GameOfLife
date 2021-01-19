import Board from './board.js';
import Editor from './editor.js';

import Brush from './tools/brush.js'

function main(){

  const board = new Board(900, 900, 50, null);
  const editor = new Editor();

  new Brush({}).activate();

}

main();