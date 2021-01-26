<template>
  <v-card elevation="12" width="100%">
    <v-card-title class="deep-purple white--text">
      <h2>Editor Tools</h2>
    </v-card-title>
    <v-card-text>
      <v-layout column class="mt-6 pl-3">
        
        <v-row >
          <v-layout column>
            <h2>Tool Selection</h2>
            <v-radio-group v-model="tool" class="mt-1" @change="update">
              <v-radio label="Brush" value="brush" on-icon="mdi-pencil" color="deep-purple"></v-radio>
              <v-radio label="Fill" value="fill" on-icon="mdi-format-color-fill" color="deep-purple"></v-radio>
              <v-radio label="Line" value="line" on-icon="mdi-arrow-left-right" color="deep-purple"></v-radio>
              <v-radio label="Rectangle" value="rect" on-icon="mdi-rectangle-outline" color="deep-purple"></v-radio>
            </v-radio-group>
            <v-slide-x-transition>
              <v-slider 
                label="Density"
                v-model="toolDensity"  
                min="1"
                max="100"
                thumb-label
                v-if="tool != 'brush'" 
                color="deep-purple" 
                track-color="grey"
                class="mt-0 pt-0 mr-2"
                @change="update"></v-slider>
            </v-slide-x-transition>
            <v-slide-x-transition>
              <v-switch
                label="Filled"
                v-model="toolFill" 
                prepend-icon="mdi-format-color-fill" 
                v-if="tool == 'rect'" 
                color="deep-purple" 
                class="mt-0 pt-0"
                @change="update"></v-switch>
            </v-slide-x-transition>
            <v-slide-x-transition>
              <v-switch
                label="Rotated"
                v-model="toolRotated" 
                prepend-icon="mdi-format-rotate-90" 
                v-if="tool == 'rect'" 
                color="deep-purple" 
                class="mt-0 pt-0"
                @change="update"></v-switch>
            </v-slide-x-transition>
            <v-slide-x-transition>
              <v-slider 
                label="Radius"
                v-model="toolSize"  
                min="0"
                max="10"
                thumb-label
                v-if="tool == 'brush'" 
                color="deep-purple" 
                track-color="grey"
                class="mt-0 pt-0"
                @change="update"></v-slider>
            </v-slide-x-transition>
            <v-slide-x-transition>
              <v-switch
                label="Round"
                v-model="toolRound" 
                prepend-icon="mdi-pencil-circle-outline" 
                v-if="tool == 'brush'" 
                color="deep-purple" 
                class="mt-0 pt-0"
                @change="update"></v-switch>
            </v-slide-x-transition>
          </v-layout>
        </v-row>
        
        <v-row class="mt-7">
          <v-layout column>
            <h2>Item Selection</h2>
            <v-radio-group v-model="item" class="mt-1" @change="update">
              <v-radio label="Cell" value="cell" on-icon="mdi-circle" color="deep-purple"></v-radio>
              <v-radio label="Block" value="block" on-icon="mdi-rectangle" color="deep-purple"></v-radio>
              <v-radio label="Erase" value="air" on-icon="mdi-eraser" color="deep-purple"></v-radio>
            </v-radio-group>
            <v-slide-x-transition>
              <v-radio-group row v-if="item == 'cell'" label="Color" v-model="itemColor" class="mt-0" @change="update">
                <v-radio value=1 color="green"></v-radio>
                <v-radio value=3 color="blue"></v-radio>
                <v-radio value=5 color="yellow"></v-radio>
              </v-radio-group>
            </v-slide-x-transition>
            <v-slide-x-transition>
              <v-switch
                label="Infected"
                v-model="itemInfected" 
                prepend-icon="mdi-virus" 
                v-if="item != 'air'" 
                color="deep-purple" 
                class="mt-0 pt-0"
                @change="update"></v-switch>
            </v-slide-x-transition>
          </v-layout>
        </v-row>

      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import Brush from "../game/tools/brush"
import Fill from "../game/tools/fill"
import Line from "../game/tools/line"
import Rectangle from "../game/tools/rectangle"
import Route from "../game/tools/route"

export default {
  name: "EditorTools",

  methods: {
    update() {

      var item = 0;

      switch(this.item) {

        case "cell":
          item = parseInt(this.itemColor);
          break;
        
        case "block":
          item = 11;
          break;

      }

      if(item != 0 && this.itemInfected)
        item++;

      const options = {
        radius: this.toolSize,
        round: this.toolRound,
        density: this.toolDensity,
        filled: this.toolFill,
        object: item,
      }

      var tool;

      switch(this.tool){

        case "brush":
          tool = new Brush(options);
          break;
        
        case "fill":
          tool = new Fill(options);
          break;

        case "line":
          tool = new Line(options);
          break;
        
        case "rect":
          tool = this.toolRotated ? new Route(options) : new Rectangle(options);
          break;

      }

      tool.activate();

    }
  },

  data: () => ({
    tool: "brush",
    toolRound: true,
    toolSize: 1,
    toolDensity: 100,
    toolFill: false,
    toolRotated: false,
    item: "cell",
    itemColor: "1",
    itemInfected: false,
  })
}
</script>