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

  cellReproduction(self, item, x, y, neighbors) {
    if(item.type != "air") return;

    // Filter colors
    if(!self.options.ignoreColorReproduction)
      neighbors = self.sortByColor(neighbors);

    else 
      neighbors = {"all": neighbors};
    
    for(var key in neighbors) {
      var cells = neighbors[key];
      // Check reproduction conditions
      if(cells.length != 3) continue;
      if(self.random(100, false) > self.options.reproductionChance) continue;
      
      self.newItems[y][x] = cells[self.random(2, true)].id;
      self.stats.births[item.color]++;
    }
  }


  cellOverpopulation(self, item, x, y, neighbors) {
    if(item.type != "cell") return;
    
    // Filter colors
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


  cellUnderpopulation(self, item, x, y, neighbors) {
    if(item.type != "cell") return;
    
    // Filter colors
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


  preventFreez(self, item, x, y, neighbors) {
    if(!self.options.preventFreez) return;
    if(item.type != "cell") return;

    // Get neighbor cells
    if(!self.options.ignoreColorReproduction)
      neighbors = self.sortByColor(neighbors)[item.color];
    
    // Check freez conditions
    if(neighbors.length < 2) return;
    if(self.random(100, false) > neighbors.length) return;
    
    // Unfreez cell
    var tries = 0;
    var success;
    do {
      const newY = y + self.random(2, true) -1;
      const newX = x + self.random(2, true) -1;
      try {
        success = self.newItems[newY][newX] == 0;
      }catch(e) {
        success = false;
      }
      if (success) {
        self.newItems[newY][newX] = item.id;
        self.newItems[y][x] = 0;
      }
    }while(!success && tries++ < 5); 
    
  }

  loopItems(methodes) {
    methodes.forEach(methode => {
      for(let y = 0; y < this.items.length; y++){
        for(let x = 0; x < this.items[y].length; x++){
          const item = new Item(this.items[y][x]);
          const neighbors = this.getNeigbours(x, y)
          methode(this, item, x, y, neighbors);
        }
      }

    });
  }


  // Get neighbor cells
  getNeigbours(x, y) {
    const neigbours = []

    for(let yOff = -1; yOff < 2; yOff++){
      for(let xOff = -1; xOff < 2; xOff++){
        if (!(xOff == 0 && yOff == 0) &&
           !(x + xOff < 0 || x + xOff >= this.items.length || y + yOff < 0 || y + yOff >= this.items.length) ) {
          const item = new Item(this.items[(y + yOff)][(x + xOff)]);
          if(item.type == "cell") neigbours.push(item);

        }

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