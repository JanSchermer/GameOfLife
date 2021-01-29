import Board from './board';

export default class Saves {

  static async save(name) {
    name = this.toBase64(name);
    const board = Board.current;

    const data = {
      name: name,
      time: Date.now(),
      height: board.height,
      width: board.width,
      resolution: board.resolution,
      options: board.options,
      items: board.items,
    }

    localStorage.setItem("save."+name, JSON.stringify(data));
  }

  static async load(name) {
    name = this.toBase64(name);
    
    var data = localStorage.getItem("save."+name);
    data = JSON.parse(data);

    return data;
  }

  static async getSaves() {
    const saves = [];

    for(let i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);

      if(key.startsWith("save.")){
        key = key.slice(5);
        key = this.fromBase64(key);
        saves.push(key);
      }
    }

    return saves;
  }

  static toBase64(str){
    return Buffer.from(str).toString("base64");
  }

  static fromBase64(str){
    return Buffer.from(str, "base64").toString();
  }

}