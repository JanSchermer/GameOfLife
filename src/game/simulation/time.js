import Simulation from "./simulation";

export default class TimeManager {
  static current;

  constructor(updateCallback) {
    this.updateCallback = updateCallback;
    this.timer = null;
    this.speed = 1;
    this.direction = "pause";
    TimeManager.current = this;
  }

  async step() {
    const timer = TimeManager.current;
    if(timer.direction == "pause") return;
    
    var gen = Simulation.current.currentGen;

    if(timer.direction == "backwards" && gen < 1){
      timer.setDirection("pause");
      return;
    }

    if(timer.direction == "forwards") gen++;
    else gen--;

    await Simulation.current.setGeneration(gen);
    setTimeout(timer.step, 1000 / timer.speed);
  }

  setDirection(dir) {
    const timer = TimeManager.current;
    if(timer.direction == dir) return;
    if(timer.timer != null) clearTimeout(timer.timer);

    timer.direction = dir;
    timer.step();
    timer.updateCallback(timer.direction);
  }

  setSpeed(speed) {
    this.speed = speed;
  }

}