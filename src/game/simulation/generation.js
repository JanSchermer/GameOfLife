import Item from "../item";

export default class Generation {

  //Options: 
  //ignoreColorReproduction:bool
  //ignoreColorOverpopulation:bool 
  //ignoreColorUnderpopulation:bool 
  //ignoreColorSpread:bool
  //reproductionChance:num
  //overpopulationDeathChance:num 
  //underpopulationDeathChance:num
  //virusDeathChance:num
  //virusSpreadChance:num
  //virusRecoveryChance:num

  //Stats:
  //population[color]
  //births[color]
  //deaths[color]
  //deathsOverpopulation[color]
  //deathsUnderpopulation[color]
  //deathsVirus[color]
  //virusInfections[color]
  //virusRecoverys[color]

  constructor(simulation){
    this.simulation = simulation;
    this.board = simulation.board;
    this.options = this.board.options;
    this.items = Array.from(simulation.board.items);
  }


  nextGen() {
    this.newItems = Array.from(this.items);

    const calcMethodes = [
      this.cellPopulation,
      this.cellOverpopulation,
      this.cellUnderpopulation,
      this.cellVirusDeath,
      this.cellVirusRecovery,
      this.virusSpread
    ]
    
    this.initStats();
    this.loopItems(calcMethodes);

    return this.newItems;
  }


  initStats() {
    this.stats = {
      population: {},
      births: {},
      deaths: {}, 
      deathsOverpopulation: {}, 
      deathsUnderpopulation: {}, 
      deathsVirus: {},
      virusInfections: {},
      virusRecoverys: {}
    };

    Item.CELL_COLORS.forEach(color => {
      for(key in this.stats)
        this.stats[key][color] = 0;
    });
  }


  cellPopulation(item, x, y) {
    if(item.type != "cell") return;
    this.stats.population[item.color]++;
  }

  cellReproduction(item, x, y) {
    if(item.type != "air") return;

    // Get neighbor cells
    const neighbors = getNeigbours(x, y)
    if(!this.options.ignoreColorReproduction)
      neighbors = this.sortByColor(neighbors)[item.color];
    
    // Check reproduction conditions
    if(neighbors.length != 3) return;
    if(this.random(100, false) > this.options.reproductionChance) return;
    
    // Reproduce random cell and add to statistics
    this.newItems[y][x] = neighbors[this.random(2, true)].id;
    this.stats.births[item.color]++;
  }


  cellOverpopulation(item, x, y) {
    if(item.type != "cell") return;

    // Get neighbor cells
    const neighbors = getNeigbours(x, y)
    if(!this.options.ignoreColorOverpopulation)
      neighbors = this.sortByColor(neighbors)[item.color];
    
    // Check death conditions
    if(neighbors.length < 4) return;
    if(this.random(100, false) > this.options.overpopulationDeathChance) return;
    
    // Kill cell and add to statistics
    this.newItems[y][x] = 0;
    this.stats.deathsOverpopulation[item.color]++;
    this.stats.deaths[item.color]++;
  }


  cellUnderpopulation(item, x, y) {
    if(item.type != "cell") return;

    // Get neighbor cells
    const neighbors = getNeigbours(x, y)
    if(!this.options.ignoreColorUnderpopulation)
      neighbors = this.sortByColor(neighbors)[item.color];
    
    // Check death conditions
    if(neighbors.length > 1) return;
    if(this.random(100, false) > this.options.underpopulationDeathChance) return;
    
    // Kill cell and add to statistics
    this.newItems[y][x] = 0;
    this.stats.deathsUnderpopulation[item.color]++;
    this.stats.deaths[item.color]++;
  }


  cellVirusDeath(item, x, y) {
    if(item.type != "cell" || !item.infected) return;

    // Check death conditions
    if(this.random(100, false) > this.options.virusDeathChance) return;

    // Kill cell and add to statistics
    this.newItems[y][x] = 0;
    this.stats.deathsVirus[item.color]++;
    this.stats.deaths[item.color]++;
  }

  
  cellVirusRecovery(item, x, y) {
    if(item.type != "cell" || !item.infected || this.newItems[y][x] != item.id) return;

    // Check recovery conditions
    if(this.random(100, false) > this.options.virusRecoveryChance) return;

    // Recover cell and add to statistics
    this.newItems[y][x] = --item.id;
    this.stats.virusRecoverys[item.color]++;
  }

  
  virusSpread(item, x, y){
    if(!item.infected) return;
    
    // Loop neigbors and check with infection proberbility
    for(let yOff = -1; yOff < 2; yOff++){
      for(let xOff = -1; xOff < 2; xOff++){
        if(xOff == 0 && yOff == 0)
          continue;

        try {
          const neigbor = this.items[y + yOff][x + xOff];
          neigbor = new Item(neigbor);

          // Check spreading conditions
          if(neigbor.type != "cell") return;
          if(!neigbor.infected) return;
          if(this.random(100, false) > this.options.virusSpreadChance) return;

          // Spread virus and add to statistics
          this.stats.virusInfections[neigbor.color]++;
        }catch(e){}
        
      }
    }
  }


  loopItems(methodes) {
    methodes.forEach(methode => {

      for(let y = 0; y < this.items.length; y++){
        for(let x = 0; x < this.items[y].length; x++){
          const item = new Item(this.items[y][x]);
          methode(item, x, y);
        }
      }

    });
  }


  // Get neighbor cells
  getNeigbours(x, y) {
    const neigbours = []

    for(let yOff = -1; yOff < 2; yOff++){
      for(let xOff = -1; xOff < 2; xOff++){
        if(xOff == 0 && yOff == 0) continue;

        try{
          const item = new Item(this.items[y + yOff][x + xOff]);
          if(item.type == "cell") neigbours.push(item);
        }catch(e){}

      }
    }

    return neigbours;
  }


  // Sort cells by color
  sortByColor(items) {
    const result = {};

    Item.CELL_COLORS.forEach(color => {
      result[color] = [];
    });
    
    items.forEach(item => {
      result[item.color].push(item);
    });

    return result;
  }


  // Get random num
  random(max , rounded) {
    const num = Math.random() * max;
    return rounded ? Math.round(num) : num;
  }

}