<template>
  <v-card elevation="12" width="100%">
    <v-card-title class="deep-purple white--text">
      <h2>Time Control</h2>
    </v-card-title>
    <v-card-text>
      <v-layout column class="mt-6 pl-3">
          
        <v-row>
          <v-layout column>
            <v-row justify="space-around" class="pr-3 mt-3 mb-3">
              <v-btn :color="timeDirection == 'backwards' ? 'green' : 'grey'" @click="setDirection('backwards')" class="rounded-pill">
                <v-icon>{{timeDirection == 'backwards' ? 'mdi-arrow-left-circle' : 'mdi-arrow-left'}}</v-icon>
              </v-btn>
              <v-btn :color="timeDirection == 'pause' ? 'red' : 'grey'" @click="setDirection('pause')" class="rounded-pill">
                <v-icon>{{timeDirection == 'pause' ? 'mdi-pause-octagon' : 'mdi-pause'}}</v-icon>
              </v-btn>
              <v-btn :color="timeDirection == 'forwards' ? 'green' : 'grey'" @click="setDirection('forwards')" class="rounded-pill">
                <v-icon>{{timeDirection == 'forwards' ? 'mdi-arrow-right-circle' : 'mdi-arrow-right'}}</v-icon>
              </v-btn>
            </v-row>
            <v-slider 
                label="Speed"
                v-model="timeSpeed"  controll or control
                min="1"
                max="10"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-0 pt-0 mr-2"
                @change="update"></v-slider>
          </v-layout>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import TimeManager from "../game/simulation/time";
export default {
  name: "TimeControl",

  methods: {
    update() {
      TimeManager.current.setSpeed(this.timeSpeed);
    },

    setDirection(direction){
      this.timeDirection = direction;
      TimeManager.current.setDirection(direction);
    }
  },

  data: () => ({
    timeDirection: "pause",
    timeSpeed: 1,
  }),

  mounted() {
    new TimeManager(this.setDirection);
  }
}
</script>