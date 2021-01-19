import Board from '../board.js';

export default class Tool{
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
  mouseMove(event) {}
  mouseRelease(event) {}

  updateMousePos(event){
    const tool = Tool.current;
    const [x, y] = tool.getMousePos(event);

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

    tool.mouseMove(event);
    
    Board.current.background.forEach(x => x.fill("white"));
    if(tool.selectVisible && tool.selectStartX > 0 && tool.selectStartY > 0){
      
      for(let i = tool.absSelectStartY; i <= tool.absSelectEndY; i++){
        Board.current.background[i].fill("#5193fc", tool.absSelectStartX, tool.absSelectEndX+1);
      }

    }

    if(!tool.isMouseDown) {
      Board.current.background[y][x] = "#99c0ff";
    }

  }

  resetSelection(){
    Board.current.background.forEach(x => x.fill("white"))
    this.selectStartX = -1;
    this.selectStartY = -1;;
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
    tool.resetSelection();
  }

  mouseLeave(event){
    const tool = Tool.current;

    tool.isMouseDown = false;
    tool.resetSelection();
  }

  activate() {
    try{Tool.current.deactivate();}
    catch(e){};
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