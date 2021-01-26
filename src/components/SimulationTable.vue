<template>
  <v-container>
    <v-layout row>
      
      <v-col cols="2">
        <TimeControl/>
        <EditorTools class="mt-6"/>
      </v-col>

      <v-col cols="8">
        <h1>TEST</h1>
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

export default {
  name: 'SimulationTable',

  components: {
    EditorTools,
    TimeControl,
    GameSettings,
  },

  data: () => ({
  }),
}
</script> 