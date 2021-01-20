import Board from './board.js';
import Editor from './editor.js';

import Brush from './tools/brush.js';
import Line from './tools/line.js';
import Rectangle from './tools/rectangle.js'
import Route from './tools/route.js'

function main(){

  const board = new Board(900, 900, 20, null);
  const editor = new Editor();

  //new Brush({radius: 1, object: 1, round: true}).activate();
  //new Line({object: 1, density:100});
  //new Rectangle({object: 1, filled: true, density:20}).activate();
  new Route({object: 1, filled: false, density:100}).activate();

}

main();