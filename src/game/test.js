import Board from './board.js';
import Editor from './editor.js';

import Brush from './tools/brush.js';
import Line from './tools/line.js';
import Rectangle from './tools/rectangle.js'
import Route from './tools/route.js'
import Fill from "./tools/fill.js";

function main(){

  const board = new Board(900, 900, 20, null);
  board.makeDefault();
  board.append("canvas");

  //new Brush({radius: 1, object: 1, round: true}).activate();
  //new Line({object: 1, density:100});
  //new Rectangle({object: 1, filled: false, density:100}).activate();
  //new Route({object: 1, filled: false, density:100}).activate();
  new Fill({object: 1, density:50}).activate();

}

main();