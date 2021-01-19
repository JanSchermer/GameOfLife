import Board from '../board.js';

export default class Tool{
  static current;

  constructor(options){
    Tool.current = this;

    this.options = options;

    this.isMouseDown = false;

    this.allowSelect = false;
    this.selectStartX = -1;
    this.selectStartY = -1;
    this.selectEndX = 0;
    this.selectEndY = 0;
    this.selected = [];
  }

  // Abstract methodes for tools
  mouseMove(event) {}
  mouseRelease(event) {}

  updateSelect(event){
    const tool = Tool.current;

    if(tool.allowSelect && tool.isMouseDown){
      const [x, y] = tool.getMousePos(event);
      
      if(tool.selectStartX < 0) tool.selectStartX = x;
      if(tool.selectStartY < 0) tool.selectStartY = y;

      tool.selectEndX = x;
      tool.selectEndY = y;

      Board.current.background.forEach(x => x.fill("white"));
      
      for(let i = tool.selectStartY; i <= tool.selectEndY; i++){
        Board.current.background[i].fill("#5193fc", tool.selectStartX, tool.selectEndX+1);
      }

    }
  }

  getMousePos(event){
    const board = Board.current;

    const rect = event.target.getBoundingClientRect();
    const y = Math.floor((event.clientX - rect.left) / board.resolution);
    const x = Math.floor((event.clientY - rect.top) / board.resolution);

    return [x, y];
  }

  mouseDown(event){
    const tool = Tool.current;

    tool.isMouseDown = true;
  }

  mouseUp(event){
    const tool = Tool.current;

    tool.isMouseDown = false;

    tool.mouseRelease(event);

    // Reset selection
    if(tool.allowSelect){
      Board.current.background.forEach(x => x.fill("white"))
      tool.selectStartX = -1;
      tool.selectStartY = -1;;
    }

  }

  activate() {
    Board.current.canvas.addEventListener("mousemove", this.mouseMove);
    Board.current.canvas.addEventListener("mousemove", this.updateSelect);
    Board.current.canvas.addEventListener("mousedown", this.mouseDown);
    Board.current.canvas.addEventListener("mouseup", this.mouseUp);
  }

  deactivate() {
    Board.current.canvas.removeEventListener("mousemove", this.mouseMove);
    Board.current.canvas.removeEventListener("mousemove", this.updateSelect);
    Board.current.canvas.removeEventListener("mousedown", this.mouseDown);
    Board.current.canvas.removeEventListener("mouseup", this.mouseUp);
  }

}