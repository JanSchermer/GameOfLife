<template>
  <v-container>
    <v-layout row>
      
      <v-col cols="2">
        <TimeControl/>
        <EditorTools class="mt-6"/>
      </v-col>

      <v-col cols="8" align="center">
        <canvas id="canvas" style="cursor: cell"/>
      </v-col>

      <v-col cols="2">
        <GameSettings/>
      </v-col>

    </v-layout>
  </v-container>
</template>

<script>
import EditorTools from "./EditorTools"
import TimeControl from "./TimeControl"
import GameSettings from "./GameSettings"

import Board from "../../game/board"
import Saves from "../../game/saves"
import Simulation from "../../game/simulation/simulation"

export default {
  name: 'SimulationTable',
  components: {
    EditorTools,
    TimeControl,
    GameSettings,
  },
  
  async mounted() {
    console.log("MT")
    window.scrollTo(0,0);
    var board = Board.current;
    if(board != null && board.width != 900)
      board = null;

    if(board == null) {
      const saves = await Saves.getSaves();

      if(saves.includes("Auto Save")) {
        const data = await Saves.load("Auto Save");
        board = new Board(data.height, data.width, data.resolution, data.items, data.options);
      } else 
        board = new Board(900, 900, 20, null, null);
    }
    board.append("canvas");
    new Simulation();
  },
}
</script> 