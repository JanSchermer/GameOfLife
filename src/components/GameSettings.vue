<template>
  <v-card elevation="12" width="100%">
    <v-card-title class="deep-purple white--text">
      <h2>Game Settings</h2>
    </v-card-title>
    <v-card-text>
      <v-layout column class="mt-6 pl-3">
          
        <v-row>
          <v-layout column>
            <v-switch label="Show Grid" v-model="showGrid" prepend-icon="mdi-grid" color="deep-purple" @change="update" class="mt-1"></v-switch>
          </v-layout>
        </v-row>

        <v-row class="mt-4">
          <v-layout column>
            <h2>Reproduction Chance</h2>
            <v-slider 
                v-model="chanceReproduction"  
                min="0"
                max="100"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-3 pt-0 pr-3"
                @change="update"></v-slider>   
          </v-layout>
        </v-row>

        <v-row>
          <v-layout column>
            <h2>Ignore Color For</h2>
            <v-switch label="Reproduction" v-model="icReproduction" prepend-icon="mdi-shape-circle-plus" color="deep-purple" @change="update"></v-switch>
            <v-switch label="Underpopulation" v-model="icUnderpopulation" prepend-icon="mdi-circle-small" color="deep-purple" @change="update" class="mt-0"></v-switch>
            <v-switch label="Overpopulation" v-model="icOverpopulation" prepend-icon="mdi-dots-triangle" color="deep-purple" @change="update" class="mt-0"></v-switch>
            <v-switch label="Virus Spread" v-model="icSpread" prepend-icon="mdi-virus" color="deep-purple" @change="update" class="mt-0"></v-switch>
          </v-layout>
        </v-row>

        <v-row class="mt-4">
          <v-layout column>
            <h2>Death Chance By</h2>
            <v-slider 
                label="Overpopulation"
                v-model="chanceDeathOver"  
                min="0"
                max="100"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-3 pt-0"
                @change="update"></v-slider>  
            <v-slider 
                label="Underpopulation"
                v-model="chanceDeathUnder" 
                min="0"
                max="100"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-0 pt-0"
                @change="update"></v-slider> 
            <v-slider 
                label="Virus Infection"
                v-model="chanceDeathVirus"  
                min="0"
                max="100"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-0 pt-0"
                @change="update"></v-slider>   
          </v-layout>
        </v-row>

        <v-row>
          <v-layout column>
            <h2>Probability For Virus</h2>
            <v-slider 
                label="Spread"
                v-model="chanceSpread"  
                min="0"
                max="100"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-3 pt-0"
                @change="update"></v-slider>  
            <v-slider 
                label="Recovery"
                v-model="chanceRecovery" 
                min="0"
                max="100"
                thumb-label
                color="deep-purple" 
                track-color="grey"
                class="mt-0 pt-0"
                @change="update"></v-slider> 
          </v-layout>
        </v-row>

      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GameSettings",

  methods: {
    update() {

      console.log("ud");

    },
  },

  data: () => ({
    showGrid: true,
    icReproduction: false,
    icOverpopulation: false,
    icUnderpopulation: false,
    icSpread: false,
    chanceSpread: 50,
    chanceRecovery: 50,
    chanceReproduction: 50,
    chanceDeathVirus: 50,
    chanceDeathOver: 50,
    chanceDeathUnder: 50,
  })
}
</script>