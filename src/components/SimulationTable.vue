<template>
  <v-container>
    <v-layout row>
      
      <v-col cols="2">
        <TimeControl/>
        <EditorTools class="mt-6"/>
      </v-col>

      <v-col cols="8" align="center">
        <canvas id="canvas"/>
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

import Board from "../game/board"
import Brush from "../game/tools/brush"

export default {
  name: 'SimulationTable',

  components: {
    EditorTools,
    TimeControl,
    GameSettings,
  },

  data: () => ({
  }),

  mounted() {
    const board = new Board(900, 900, 20, null, {showGrid: true, })
    board.append("canvas");
    new Brush({radius: 1, round: true, object: 1}).activate();
  }
}
</script> 