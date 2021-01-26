import Board from '../board.js';

export default class Tool{
  static selectColor = "#a071f5";
  static current;

  constructor(options){
    this.options = options;

    this.isMouseDown = false;

    this.selectVisible = false;
    this.selectStartX = -1;
    this.selectStartY = -1;
    this.selectEndX = 0;
    this.selectEndY = 0;
    this.selected = [];

  }

  // Abstract methodes for tools
  //mouseMove() {}
  //mouseRelease() {}

  updateMousePos(event){
    const tool = Tool.current;
    const [x, y] = tool.getMousePos(event);

    // Calculate mouse selectios
    if(tool.isMouseDown){
      
      if(tool.selectStartX < 0) tool.selectStartX = x;
      if(tool.selectStartY < 0) tool.selectStartY = y;

      tool.selectEndX = x;
      tool.selectEndY = y;

      tool.absSelectStartX = Math.min(x, tool.selectStartX)
      tool.absSelectEndX = Math.max(x, tool.selectStartX)

      tool.absSelectStartY = Math.min(y, tool.selectStartY)
      tool.absSelectEndY = Math.max(y, tool.selectStartY)

    }

    // Claer screen
    Board.current.background.forEach(x => x.fill("white"));

    tool.mouseMove(event);

    if(!tool.isMouseDown) {
      Board.current.background[y][x] = "#7d47de";
    }

  }

  resetSelection(){
    Board.current.background.forEach(x => x.fill("white"))
    this.selectStartX = -1;
    this.selectStartY = -1;
  }

  getMousePos(event){
    const board = Board.current;

    const rect = event.target.getBoundingClientRect();
    const y = Math.floor((event.clientX - rect.left) / board.resolution);
    const x = Math.floor((event.clientY - rect.top) / board.resolution);

    return [x, y];
  }

  mouseDown(){
    const tool = Tool.current;

    tool.isMouseDown = true;
  }

  mouseUp(event){
    const tool = Tool.current;

    tool.isMouseDown = false;
    tool.mouseRelease(event);
    tool.resetSelection();
  }

  mouseLeave(){
    const tool = Tool.current;

    tool.isMouseDown = false;
    tool.resetSelection();
  }

  activate() {
    if(Tool.current != null) Tool.current.deactivate();
    Tool.current = this;

    Board.current.canvas.addEventListener("mousemove", this.updateMousePos);
    Board.current.canvas.addEventListener("mousedown", this.mouseDown);
    Board.current.canvas.addEventListener("mouseleave", this.mouseLeave);
    Board.current.canvas.addEventListener("mouseup", this.mouseUp);
  }

  deactivate() {
    Board.current.canvas.removeEventListener("mousemove", this.updateMousePos);
    Board.current.canvas.removeEventListener("mousedown", this.mouseDown);
    Board.current.canvas.removeEventListener("mouseleave", this.mouseLeave);
    Board.current.canvas.removeEventListener("mouseup", this.mouseUp);
    this.resetSelection();
  }

}