export default class Item {

  static CELL_COLORS = ["green", "blue", "orange"];
  
  // 0 : Air

  // 1 : Green healthy cell
  // 2 : Green infected cell
  // 3 : Blue healthy cell
  // 4 : Blue infected cell
  // 5 : Yellow healthy cell
  // 6 : Yellow infected cell

  // 11: Wall
  // 12: Virus Spreader 

  constructor(id) {

    this.id = id;
    this.type = "error";
    this.color = "error";
    this.shape = "error";
    this.infected = false;

    // Air
    if(id == 0){
      this.type = "air";
      this.shape = "square";
      this.color = "white";
    }
    
    // Cells
    else if(id <= 10){
      this.type = "cell";
      this.shape = "circle";
      
      if(id < 3)
        this.color = "green";
      
      else if(id < 5)
        this.color = "blue";
      
      else if(id < 7)
        this.color = "orange";
      
      this.infected = id % 2 == 0;
    }

    // Blocks
    else if(id <= 20) {
      this.type = "block";
      this.shape = "square";
      this.color = "black";

      // Virus Spreader
      if(id == 12){
        this.infected = true;
      }
    }

  }

}