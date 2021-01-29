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

  constructor(simulation, items){
    this.simulation = simulation;
    this.board = simulation.board;
    this.options = this.board.options;
    this.items = items == null ? this.deepCopy(this.board.items) : items;
  }


  nextGen() {
    this.newItems = this.deepCopy(this.items);

    const calcMethodes = [
      this.cellPopulation,
      this.cellReproduction,
      this.cellUnderpopulation,
      this.cellOverpopulation,
      this.virusSpread,
      this.cellVirusDeath,
      this.cellVirusRecovery,
      this.preventFreez,
    ]
    
    this.initStats();
    this.loopItems(calcMethodes);

    return this.newItems;
  }

  deepCopy(array){
    return JSON.parse(JSON.stringify(array));
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
      for(var key in this.stats)
        this.stats[key][color] = 0;
    });
  }


  cellPopulation(self, item) {
    if(item.type != "cell") return;
    self.stats.population[item.color]++;
  }

  cellReproduction(self, item, x, y) {
    if(item.type != "air") return;

    // Get neighbor cells
    var neighbors = self.getNeigbours(x, y)
    if(!self.options.ignoreColorReproduction)
      neighbors = self.sortByColor(neighbors);

    else 
      neighbors = {"all": neighbors};
    
    for(var key in neighbors) {
      var cells = neighbors[key];
      if(cells.length > 0)
        console.log(cells);
      // Check reproduction conditions
      if(cells.length != 3) continue;
      if(self.random(100, false) > self.options.reproductionChance) continue;
      
      self.newItems[y][x] = cells[self.random(2, true)].id;
      self.stats.births[item.color]++;
    }
  }


  cellOverpopulation(self, item, x, y) {
    if(item.type != "cell") return;
    
    // Get neighbor cells
    var neighbors = self.getNeigbours(x, y)
    if(!self.options.ignoreColorOverpopulation)
      neighbors = self.sortByColor(neighbors)[item.color];
    
    // Check death conditions
    if(neighbors.length < 4) return;
    if(self.random(100, false) > self.options.overpopulationDeathChance) return;
    
    // Kill cell and add to statistics
    self.newItems[y][x] = 0;
    self.stats.deathsOverpopulation[item.color]++;
    self.stats.deaths[item.color]++;
  }


  cellUnderpopulation(self, item, x, y) {
    if(item.type != "cell") return;
    
    // Get neighbor cells
    var neighbors = self.getNeigbours(x, y)

    if(!self.options.ignoreColorUnderpopulation)
      neighbors = self.sortByColor(neighbors)[item.color];
    
    // Check death conditions
    if(neighbors.length > 1) return;
    if(self.random(100, false) > self.options.underpopulationDeathChance) return;
    
    // Kill cell and add to statistics
    self.newItems[y][x] = 0;
    self.stats.deathsUnderpopulation[item.color]++;
    self.stats.deaths[item.color]++;
  }


  cellVirusDeath(self, item, x, y) {
    if(item.type != "cell" || !item.infected) return;
    
    // Check death conditions
    if(self.random(100, false) > self.options.virusDeathChance) return;

    // Kill cell and add to statistics
    self.newItems[y][x] = 0;
    self.stats.deathsVirus[item.color]++;
    self.stats.deaths[item.color]++;
  }

  
  cellVirusRecovery(self, item, x, y) {
    if(item.type != "cell" || !item.infected || self.newItems[y][x] != item.id) return;

    // Check recovery conditions
    if(self.random(100, false) > self.options.virusRecoveryChance) return;

    // Recover cell and add to statistics
    self.newItems[y][x] = --item.id;
    self.stats.virusRecoverys[item.color]++;
  }

  
  virusSpread(self, item, x, y){
    if(!item.infected) return;
    
    // Loop neigbors and check with infection proberbility
    for(let yOff = -1; yOff < 2; yOff++){
      for(let xOff = -1; xOff < 2; xOff++){
        if(xOff == 0 && yOff == 0)
          continue;

        try {
          var neigbor = self.newItems[y + yOff][x + xOff];
          neigbor = new Item(neigbor);

          // Check spreading conditions
          if(neigbor.type != "cell") continue;
          if(!self.options.ignoreColorSpread && neigbor.color != item.color) continue;
          if(neigbor.infected) continue;
          if(self.random(100, false) > self.options.virusSpreadChance) continue;
          
          // Spread virus and add to statistics
          self.newItems[y + yOff][x + xOff]++;
          self.stats.virusInfections[neigbor.color]++;
        }catch(e){continue;}
        
      }
    }
  }


  preventFreez(self, item, x, y) {
    if(!self.options.preventFreez) return;
    if(item.type != "cell") return;

    // Get neighbor cells
    var neighbors = self.getNeigbours(x, y)
    if(!self.options.ignoreColorReproduction)
      neighbors = self.sortByColor(neighbors)[item.color];
    
    // Check freez conditions
    if(neighbors.length < 2) return;
    if(self.random(100, false) > neighbors.length) return;
    
    // Unfreez cell
    self.newItems[y][x] = 0;
    try {
      self.newItems[y + self.random(2, true) -1][x + self.random(2, true) -1] = item.id;
    }catch(e) {return;}
    
  }

  loopItems(methodes) {
    methodes.forEach(methode => {
      console.log(methode);
      for(let y = 0; y < this.items.length; y++){
        for(let x = 0; x < this.items[y].length; x++){
          const item = new Item(this.items[y][x]);
          methode(this, item, x, y);
        }
      }

    });
  }


  // Get neighbor cells
  getNeigbours(x, y) {
    const neigbours = []

    let c = 0;
    for(let yOff = -1; yOff < 2; yOff++){
      for(let xOff = -1; xOff < 2; xOff++){
        if(xOff == 0 && yOff == 0) console.log();
        else if(x + xOff < 0 || x + xOff >= this.items.length || y + yOff < 0 || y + yOff >= this.items.length) console.log();
        else {
          const item = new Item(this.items[(y + yOff)][(x + xOff)]);
          if(item.type == "cell") {
            neigbours.push(item)
            c++;
          }

        }

      }
    }
    if(c > 0)
      console.log(x, y, c);
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