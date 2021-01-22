import Item from "../item";

export default class Generation {

  // Options: 
  //ignoreColorReproduction:bool
  //ignoreColorOverpopulation:bool 
  //ignoreColorUnderpopulation:bool 
  //ignoreColorSpread:bool
  //reproductionChance:num
  //overpopulationDeathChance:num 
  //underpopulationDeathChance:num
  //virusDeathChance:num
  //virusSpreadChance:num

  //Stats:
  //population[color]
  //births[color]
  //deaths[color]
  //deathsOverpopulation[color]
  //deathsUnderpopulation[color]
  //deathsVirus[color]
  //infections[color]

  constructor(simulation){
    this.simulation = simulation;
    this.options = simulation.options;
    this.board = simulation.board;
    this.items = Array.from(simulation.board.items);
  }

  nextGen() {
    this.stats = {
       population: {},
       births: {},
       deaths: {}, 
       deathsOverpopulation: {}, 
       deathsUnderpopulation: {}, 
       deathsVirus: {},
       infections: {}
      }

    items = Array.from(this.items);

    Item.CELL_COLORS.forEach(color => {
      this.stats.population[color] = 0;
      this.stats.births[color] = 0;
      this.stats.deaths[color] = 0;
      this.stats.deathsOverpopulation[color] = 0;
      this.stats.deathsUnderpopulation[color] = 0;
      this.stats.deathsVirus[color] = 0;
      this.stats.infections[color] = 0;
    })

    // Birth and death calculations
    for(let y = 0; y < items.length; y++){
      for(let x = 0; x < items[y].length; x++){
        const item = new Item(this.items[y][x]);
        const neigbours = this.getNeigbours(x, y, this.items);
        const neigbourCells = this.getNeigboursCells(neigbours);
        const neigbourCellColors = this.sortByColor(neigbourCells);

        // Calculate population
        if(item.type == "cell")
          this.stats.population[item.color]++;

        // Cell reproduction
        if(item.type == "air") {
          if(this.options.ignoreColorReproduction) {
            if(neigbourCells.length == 3 && Math.random() * 100 < this.options.reproductionChance) {
              this.items[y][x] = neigbourCells[Math.round(Math.random() * 2)].id;
            }
          }else {
            for(var color in neigbourCellColors){
              if(neigbourCellColors[color].length == 3 && Math.random() * 100 < this.options.reproductionChance) {
                this.items[y][x] = neigbourCellColors[color][Math.round(Math.random() * 2)].id;
              }
            }
          }
          if(this.items[y][x] != 0)
            this.stats.births[new Item(this.items[y][x]).color]++;
        }

        if(item.type == "cell"){

          // Cell death by overpopulation
          if(this.options.ignoreColorOverpopulation){
            if(neigbourCells.length > 3 && Math.random() * 100 < this.options.overpopulationDeathChance) {
              items[y][x] = 0;
              this.stats.deathsOverpopulation[item.color]++;
            }
          }else {
            if(neigbourCellColors[item.color].length > 3 && Math.random() * 100 < this.options.overpopulationDeathChance) {
              items[y][x] = 0;
              this.stats.deathsOverpopulation[item.color]++;
            }
          }

          // Cell death by underpopulation
          if(items[y][x] != 0){
            if(this.options.ignoreColorUnderpopulation){
              if(neigbourCells.length < 2 && Math.random() * 100 < this.options.underpopulationDeathChance) {
                items[y][x] = 0;
                this.stats.deathsUnderpopulation[item.color]++;
              }
            }else {
              if(neigbourCellColors[item.color].length < 2 && Math.random() * 100 < this.options.underpopulationDeathChance) {
                items[y][x] = 0;
                this.stats.deathsUnderpopulation[item.color]++;
              }
            }
          }

          // Cell death by virus
          if(item.infected && items[y][x] != 0) {
            if(Math.random() * 100 < this.options.virusDeathChance){
              items[y][x] = 0;
              this.stats.deathsVirus[item.color]++;
            }
          }

          if(this.items[y][x] == 0)
            this.stats.deaths[item.color]++;
        }
      }
    }

    // Virus spread calculation
    for(let y = 0; y < items.length; y++){
      for(let x = 0; x < items[y].length; x++){
        const item = new Item(this.items[y][x]);
        
        if(item.infected){
          const neigbours = this.getNeigbours(x, y, this.items);
          const neigbourCells = this.getNeigboursCells(neigbours);
          
          for(let yOff = -1; yOff < 2; yOff++){
            for(let xOff = -1; xOff < 2; xOff++){
              if(xOff == 0 && yOff == 0)
                continue;
      
              try{
                const neigbour = new Item(this.items[y + yOff][x + xOff]);

                if(!neigbour.infected){
                  if(item.type == "cell" && !this.options.ignoreColorSpread && item.color != neigbour.color)
                    continue;
                  
                  if(Math.random() * 100 < this.options.virusSpreadChance){
                    this.items[y + yOff][x + xOff]++;
                    this.stats.infections[neigbour.color]++;
                  }
                }
              }catch(e){}
            }
          }
        }
      }
    }
  }

  getNeigbours(x, y, map) {
    const neigbours = []

    for(let yOff = -1; yOff < 2; yOff++){
      for(let xOff = -1; xOff < 2; xOff++){
        if(xOff == 0 && yOff == 0)
          continue;

        try{
          const item = new Item(map[y + yOff][x + xOff]);

          neigbours.push(item);
        }catch(e){}
      }
    }

    return neigbours;
  }

  getNeigboursCells(neigbours) {
    return neigbours.filter(item => item.type == "cell");
  }

  sortByColor(items) {
    const result = {};

    items.forEach(item => {
      if(!item.color in result)
        result[item.color] = [item];
      else
        result[item.color].push(item);
    });

    return result;
  }

}