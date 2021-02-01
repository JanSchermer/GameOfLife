<template>
  <v-container>
    <v-card :elevation='mouseover ? 20 : 10' @mouseover="mouseover=true" @mouseleave="elevation=mouseover=false" class="card">
      <v-card-title class="deep-purple white--text justify-center">
        <h1>{{$props.title}}</h1>
      </v-card-title>
      <v-card-text :class="mouseover ? 'deep-purple lighten-2' : 'deep-purple lighten-4'" class="text-center">
        <v-flex class="pt-7">
          <canvas :id="id" :height="$props.height" :width="$props.width"></canvas>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Board from '../../game/board'

export default {
  name: "BoardConvas",
  data: () => ({
    mouseover : false,
  }),
  props: {
    title: String,
    height: Number,
    width: Number,
    resolution: Number,
    items: Array,
    showGrid: Boolean,
  },
  computed: {
    id() {
      return Math.round(Math.random() * 1000000).toString();
    }
  },
  mounted() {
    const height = this.$props.height;
    const width = this.$props.width;
    const resolution = this.$props.resolution;
    const items = this.$props.items;
    const showGrid = this.$props.showGrid;

    const board = new Board(height, width, resolution, items, {showGrid: showGrid});
    board.canvas = document.getElementById(this.id);
    Board.current = board;
    board.draw();
  },
}
</script>

<style scoped>
  .card {
    border-radius: 20px;
    cursor: pointer;
  }
</style>